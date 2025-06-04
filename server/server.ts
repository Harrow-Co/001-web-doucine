// server/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './event-module/event.routes'; // Importer nos routes d'événements
import authRoutes from './auth-module/auth.routes'; // Importer nos routes d'authentification
import { authenticate, requireEditor } from './auth-module/auth.middleware'; // Importer nos middlewares d'authentification

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app: Express = express();
const port = process.env.EVENT_SERVER_PORT || 3000; // Port par défaut 3000 si non défini

// --- Middlewares ---
// Configuration CORS améliorée pour tous les environnements
// Utiliser une fonction pour origin au lieu d'une liste pour plus de flexibilité
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Autoriser les requêtes sans origin (comme les appels API mobiles ou Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    // Liste des domaines autorisés
    const allowedDomains = [
      // Production
      'https://association-doucine.fr',
      'https://www.association-doucine.fr',
      'https://api.association-doucine.fr',
      // Netlify preview URLs (vérifié dans la condition ci-dessous)
      // Développement local - tous les ports
      'http://localhost:',
      'http://127.0.0.1:'
    ];
    
    // Vérifier si l'origine est autorisée
    const isAllowed = 
      // Vérifier les domaines exacts ou les préfixes
      allowedDomains.some(domain => origin.startsWith(domain)) ||
      // Vérifier les domaines Netlify
      origin.match(/\.netlify\.app$/);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`CORS blocked request from origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
};

app.use(cors(corsOptions));

// Log des requêtes pour le débogage
app.use((req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin || 'N/A'}`);
  next();
});

// Parser les corps de requête entrants en JSON
app.use(express.json());

// Parser les corps de requête URL-encoded (pour les formulaires HTML standard, moins probable pour une API)
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
// Route de base pour vérifier si le serveur est en ligne
app.get('/', (req: Request, res: Response) => {
  res.send('Event Management Server is running!');
});

// Endpoint de santé pour le healthcheck Docker
app.get('/api/v2/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Monter les routes pour les événements et l'authentification sous le préfixe /api/v2
app.use('/api/v2', authRoutes);

// Routes publiques des événements
app.use('/api/v2', eventRoutes);

// Les routes admin sont maintenant sécurisées directement dans leurs fichiers de routes respectifs

// --- Démarrage du Serveur ---
app.listen(port, () => {
  console.log(`⚡️[server]: Event Management Server is running at http://localhost:${port}`);
  // Note: La connexion à la DB SQLite se fait lors de l'import de './event-module/db'
  // qui est utilisé par './event-module/event.service', lui-même utilisé par eventRoutes.
  // Le message "Connected to the SQLite database" devrait s'afficher avant ce message si tout va bien.
});
