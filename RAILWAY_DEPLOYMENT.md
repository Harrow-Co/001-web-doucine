# Deploying Doucine Events API to Railway

This guide explains how to deploy the Doucine Events API to Railway.

## Prerequisites

1. [Railway Account](https://railway.app/)
2. Railway CLI (Optional)
3. Git

## Deployment Steps

### Method 1: GitHub Integration (Easiest)

1. Push your code to GitHub
2. Log in to [Railway Dashboard](https://railway.app/)
3. Click "New Project" > "Deploy from GitHub repo"
4. Select the Doucine repository
5. In configuration:
   - Set Environment to "Production"
   - Set Root Directory to `/` (root)
   - Service Name: `doucine-events-api`
6. Click "Deploy"

### Method 2: Using Railway CLI

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login:
   ```bash
   railway login
   ```

3. Link your project:
   ```bash
   railway link
   ```

4. Create a persistent volume:
   ```bash
   railway service add volume --type persistent --mount-path /data --name doucine-events-db 
   ```

5. Deploy the app:
   ```bash
   railway up
   ```

## Environment Variables

Railway will use the variables defined in `railway.toml`, but you can also set them in the Railway dashboard:

- `EVENT_SERVER_PORT`: 3000
- `NODE_ENV`: production
- `RAILWAY_VOLUME_MOUNT_PATH`: /data (set automatically)

## Database Persistence

The SQLite database will be stored in the persistent volume at `/data/events.db`. This ensures data is not lost between deployments.

## Checking Deployment Status

1. In Railway dashboard, navigate to your project
2. Go to "Metrics" to monitor resource usage
3. Check "Logs" for any issues
4. Access your API at the provided domain

## Connecting Frontend

Update your `.env.production` file:
```
VITE_EVENT_API_URL=https://your-railway-domain.up.railway.app/api/v2
```
