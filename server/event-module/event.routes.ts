// server/event-module/event.routes.ts
import { Router, Request, Response } from 'express';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './event.model';

const router = Router();
// Instancier le service
const eventService = new EventService();

// --- Routes Publiques ---

// GET /api/v2/events - Récupérer tous les événements (pour affichage public)
router.get('/events', async (req: Request, res: Response) => {
  try {
    const events = await eventService.findAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json({ message: 'Failed to retrieve events' });
  }
});

// GET /api/v2/events/:id - Récupérer un événement spécifique par ID (potentiellement public aussi)
// Note: Si cette route doit aussi être publique, gardez-la ici. Sinon, déplacez-la vers les routes admin.
router.get('/events/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const event = await eventService.findEventById(id);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: `Event with id ${id} not found` });
        }
    } catch (error) {
        console.error(`Error fetching event ${id}:`, error);
        res.status(500).json({ message: 'Failed to retrieve event' });
    }
});


// --- Routes Admin (Nécessiteront une authentification plus tard) ---
// Nous allons préfixer ces routes par '/admin' pour les distinguer

// POST /api/v2/admin/events - Créer un nouvel événement
router.post('/admin/events', async (req: Request, res: Response) => {
  // TODO: Ajouter la validation du body (req.body)
  const eventData: CreateEventDto = req.body;
  try {
    const newEvent = await eventService.createEvent(eventData);
    res.status(201).json(newEvent); // 201 Created
  } catch (error) {
    console.error('Error creating event:', error);
    // TODO: Améliorer la gestion d'erreur (ex: 400 Bad Request si validation échoue)
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// PUT /api/v2/admin/events/:id - Mettre à jour un événement existant
router.put('/admin/events/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Ajouter la validation du body (req.body)
  const eventData: UpdateEventDto = req.body;
  try {
    const updatedEvent = await eventService.updateEvent(id, eventData);
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: `Event with id ${id} not found` });
    }
  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
     // TODO: Améliorer la gestion d'erreur
    res.status(500).json({ message: 'Failed to update event' });
  }
});

// DELETE /api/v2/admin/events/:id - Supprimer un événement
router.delete('/admin/events/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await eventService.deleteEvent(id);
    if (deleted) {
      res.status(204).send(); // 204 No Content (succès sans corps de réponse)
    } else {
      res.status(404).json({ message: `Event with id ${id} not found` });
    }
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});


// GET /api/v2/admin/events - Récupérer tous les événements (pour l'interface admin)
// Peut être différent de la route publique (plus de détails, pagination, etc.)
// Pour l'instant, faisons simple et utilisons la même logique que la route publique.
router.get('/admin/events', async (req: Request, res: Response) => {
    try {
        const events = await eventService.findAllEvents();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching all admin events:', error);
        res.status(500).json({ message: 'Failed to retrieve admin events' });
    }
});


// Exporter le routeur pour l'intégrer dans l'application Express principale
export default router;
