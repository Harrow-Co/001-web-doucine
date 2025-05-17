// server/routes/health.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'event-management-api',
    version: '1.0.0'
  });
});

export default router;
