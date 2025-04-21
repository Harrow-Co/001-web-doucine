/**
 * Script pour installer le provider AWS S3 pour Strapi
 * Exécuter avec: node scripts/install-s3-provider.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Installation du provider AWS S3 pour Strapi...');

try {
  execSync('npm install @strapi/provider-upload-aws-s3', { stdio: 'inherit' });
  console.log('✅ Installation réussie!');
  
  console.log('Pour utiliser AWS S3, configurez les variables d\'environnement suivantes:');
  console.log(`
STORAGE_PROVIDER=aws-s3
AWS_ACCESS_KEY_ID=votre_access_key
AWS_ACCESS_SECRET=votre_secret_key
AWS_REGION=votre_region
AWS_BUCKET_NAME=votre_bucket
  `);
  
} catch (error) {
  console.error('❌ Erreur lors de l\'installation:', error.message);
  process.exit(1);
} 