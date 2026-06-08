import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const VISITS_FILE = path.join(DATA_DIR, 'visits.json');

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialiser le fichier s'il n'existe pas
if (!fs.existsSync(VISITS_FILE)) {
  fs.writeFileSync(VISITS_FILE, JSON.stringify({
    totalVisits: 0,
    uniqueVisitors: new Set(),
  }));
}

export async function POST(request) {
  try {
    const { visitorId } = await request.json();
    
    // Lire le fichier de visites
    let visitsData = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8'));
    
    // S'assurer que uniqueVisitors est un ensemble
    if (!Array.isArray(visitsData.uniqueVisitors)) {
      visitsData.uniqueVisitors = [];
    }
    
    // Incrémenter le compteur total
    visitsData.totalVisits++;
    
    // Ajouter le visiteur unique s'il n'existe pas déjà
    if (!visitsData.uniqueVisitors.includes(visitorId)) {
      visitsData.uniqueVisitors.push(visitorId);
    }
    
    // Écrire les données mises à jour
    fs.writeFileSync(VISITS_FILE, JSON.stringify(visitsData, null, 2));
    
    return NextResponse.json({
      totalVisits: visitsData.totalVisits,
      uniqueVisitors: visitsData.uniqueVisitors.length,
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
    let visitsData = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8'));
    
    if (!Array.isArray(visitsData.uniqueVisitors)) {
      visitsData.uniqueVisitors = [];
    }
    
    return NextResponse.json({
      totalVisits: visitsData.totalVisits,
      uniqueVisitors: visitsData.uniqueVisitors.length,
    });
  } catch (error) {
    console.error('Error reading visits:', error);
    return NextResponse.json(
      { totalVisits: 0, uniqueVisitors: 0 },
      { status: 200 }
    );
  }
}
