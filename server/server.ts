// server/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './event-module/event.routes'; // Importer nos routes d'événements

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app: Express = express();
const port = process.env.EVENT_SERVER_PORT || 3000; // Port par défaut 3000 si non défini

// --- Middlewares ---
// Configuration CORS pour la production
const corsOptions = {
  origin: [
    'https://association-doucine.fr',
    'http://localhost:3000',
    'http://localhost:8080'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Parser les corps de requête entrants en JSON
app.use(express.json());

// Parser les corps de requête URL-encoded (pour les formulaires HTML standard, moins probable pour une API)
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
// Route de base pour vérifier si le serveur est en ligne
app.get('/', (req: Request, res: Response) => {
  res.send('Event Management Server is running!');
});

// Monter les routes pour les événements sous le préfixe /api/v2
app.use('/api/v2', eventRoutes);

// --- Démarrage du Serveur ---
app.listen(port, () => {
  console.log(`⚡️[server]: Event Management Server is running at http://localhost:${port}`);
  // Note: La connexion à la DB SQLite se fait lors de l'import de './event-module/db'
  // qui est utilisé par './event-module/event.service', lui-même utilisé par eventRoutes.
  // Le message "Connected to the SQLite database" devrait s'afficher avant ce message si tout va bien.
});
