import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let useMongoDb = false;
let getVisitsCollection = null;
let useGist = false;
const GIST_ID = process.env.GITHUB_GIST_ID || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_GIST_TOKEN || '';

// Essayer d'importer MongoDB si disponible
try {
  const mongoModule = require('@/lib/mongodb');
  getVisitsCollection = mongoModule.getVisitsCollection;
  useMongoDb = !!process.env.MONGODB_URI;
} catch (e) {
  console.log('MongoDB not configured, using file system');
}

// If GIST info is provided, prefer it for persistent storage on serverless platforms
if (GIST_ID && GITHUB_TOKEN) {
  useGist = true;
  console.log('GitHub Gist configured for visits storage');
}

const DATA_DIR = path.join(process.cwd(), 'data');
const VISITS_FILE = path.join(DATA_DIR, 'visits.json');

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialiser le fichier s'il n'existe pas
const initializeVisitsFile = () => {
  if (!fs.existsSync(VISITS_FILE)) {
    const initialData = {
      totalVisits: 0,
      uniqueVisitors: []
    };
    fs.writeFileSync(VISITS_FILE, JSON.stringify(initialData, null, 2));
  }
};

if (!useMongoDb) {
  initializeVisitsFile();
}

export async function POST(request) {
  try {
    const { visitorId } = await request.json();
    
    if (!visitorId) {
      return NextResponse.json(
        { error: 'visitorId is required' },
        { status: 400 }
      );
    }
    
    let result = { totalVisits: 0, uniqueVisitors: 0 };
    
    if (useMongoDb && getVisitsCollection) {
      try {
        const collection = await getVisitsCollection();
        
        // Obtenir le document de statistiques
        let stats = await collection.findOne({ _id: 'stats' });
        
        if (!stats) {
          stats = {
            _id: 'stats',
            totalVisits: 0,
            uniqueVisitors: []
          };
        }
        
        // Incrémenter le compteur total
        stats.totalVisits++;
        
        // Ajouter le visiteur unique s'il n'existe pas
        if (!stats.uniqueVisitors.includes(visitorId)) {
          stats.uniqueVisitors.push(visitorId);
        }
        
        // Mettre à jour la base de données
        await collection.updateOne(
          { _id: 'stats' },
          { $set: stats },
          { upsert: true }
        );
        
        result = {
          totalVisits: stats.totalVisits,
          uniqueVisitors: stats.uniqueVisitors.length
        };
        
        console.log('MongoDB visit tracked:', {
          visitorId,
          totalVisits: result.totalVisits,
          uniqueVisitorsCount: result.uniqueVisitors
        });
      } catch (mongoError) {
        console.error('MongoDB error, falling back to file system:', mongoError);
        useMongoDb = false;
      }
    }
    
    // Prefer Gist if configured (persistent on serverless)
    if (!useMongoDb && useGist) {
      try {
        // read gist
        const gistResp = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json'
          }
        });
        const gist = await gistResp.json();
        let visitsData = { totalVisits: 0, uniqueVisitors: [] };
        if (gist && gist.files && gist.files['visits.json'] && gist.files['visits.json'].content) {
          try { visitsData = JSON.parse(gist.files['visits.json'].content); } catch(e){ visitsData = { totalVisits:0, uniqueVisitors:[] }; }
        }

        visitsData.totalVisits = (typeof visitsData.totalVisits === 'number') ? visitsData.totalVisits + 1 : 1;
        if (!Array.isArray(visitsData.uniqueVisitors)) visitsData.uniqueVisitors = [];
        if (!visitsData.uniqueVisitors.includes(visitorId)) visitsData.uniqueVisitors.push(visitorId);

        // update gist
        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
          method: 'PATCH',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ files: { 'visits.json': { content: JSON.stringify(visitsData, null, 2) } } })
        });

        result = { totalVisits: visitsData.totalVisits, uniqueVisitors: visitsData.uniqueVisitors.length };
        console.log('Gist visit tracked:', result);
      } catch (gistError) {
        console.error('Gist error, falling back to file system:', gistError);
        useGist = false; // fallback to file
      }
    }

    // Fallback to file system
    if (!useMongoDb && !useGist) {
      try {
        let visitsData = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8'));

        if (typeof visitsData.totalVisits !== 'number') {
          visitsData.totalVisits = 0;
        }
        if (!Array.isArray(visitsData.uniqueVisitors)) {
          visitsData.uniqueVisitors = [];
        }

        visitsData.totalVisits++;

        if (!visitsData.uniqueVisitors.includes(visitorId)) {
          visitsData.uniqueVisitors.push(visitorId);
        }

        // attempt safe write
        try {
          fs.writeFileSync(VISITS_FILE, JSON.stringify(visitsData, null, 2));
        } catch (writeErr) {
          console.error('Write to visits file failed:', writeErr);
        }

        result = {
          totalVisits: visitsData.totalVisits,
          uniqueVisitors: visitsData.uniqueVisitors.length
        };

        console.log('File system visit tracked:', result);
      } catch (fsErr) {
        console.error('Failed to read/write visits file:', fsErr);
      }
    }
    
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let result = { totalVisits: 0, uniqueVisitors: 0 };
    
    if (useMongoDb && getVisitsCollection) {
      try {
        const collection = await getVisitsCollection();
        const stats = await collection.findOne({ _id: 'stats' });
        
        if (stats) {
          result = {
            totalVisits: stats.totalVisits || 0,
            uniqueVisitors: (stats.uniqueVisitors || []).length
          };
        }
        
        console.log('MongoDB stats retrieved:', result);
      } catch (mongoError) {
        console.error('MongoDB error on GET, falling back to file system:', mongoError);
        useMongoDb = false;
      }
    }
    
    // Fallback to file system
    if (!useMongoDb && useGist) {
      try {
        const gistResp = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' }
        });
        const gist = await gistResp.json();
        let visitsData = { totalVisits: 0, uniqueVisitors: [] };
        if (gist && gist.files && gist.files['visits.json'] && gist.files['visits.json'].content) {
          try { visitsData = JSON.parse(gist.files['visits.json'].content); } catch(e) { visitsData = { totalVisits:0, uniqueVisitors:[] }; }
        }

        result = {
          totalVisits: visitsData.totalVisits || 0,
          uniqueVisitors: (visitsData.uniqueVisitors || []).length || 0
        };

        console.log('Gist stats retrieved:', result);
      } catch (gistErr) {
        console.error('Gist read error, falling back to file system:', gistErr);
        useGist = false;
      }
    }

    // Fallback to file system
    if (!useMongoDb && !useGist) {
      try {
        let visitsData = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8'));

        if (!Array.isArray(visitsData.uniqueVisitors)) {
          visitsData.uniqueVisitors = [];
        }

        result = {
          totalVisits: visitsData.totalVisits || 0,
          uniqueVisitors: visitsData.uniqueVisitors.length || 0
        };

        console.log('File system stats retrieved:', result);
      } catch (fsErr) {
        console.error('Error reading visits file:', fsErr);
        result = { totalVisits: 0, uniqueVisitors: 0 };
      }
    }
    
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error reading visits:', error);
    return NextResponse.json(
      { totalVisits: 0, uniqueVisitors: 0 },
      { status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  }
}
