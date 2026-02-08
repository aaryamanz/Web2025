#!/bin/bash
# Run this from your Mac to deploy to EC2 in one command
# Usage: ./deploy-remote.sh

set -e

PEM_PATH="${PEM_PATH:-$HOME/Desktop/Aaryaman Website Info/AaryamanNew.pem}"  # Or: PEM_PATH=/path/to/key.pem ./deploy-remote.sh
EC2_HOST="ubuntu@3.130.34.6"

if [ ! -f "$PEM_PATH" ]; then
  echo "❌ PEM file not found at $PEM_PATH"
  echo "   Edit deploy-remote.sh and set PEM_PATH to your key location"
  exit 1
fi

echo "🚀 Deploying to EC2..."
ssh -i "$PEM_PATH" "$EC2_HOST" 'bash -s' << 'ENDSSH'
  cd /var/www/Web2025Build
  git pull origin main
  npm install
  npm run build
  sudo systemctl reload nginx
  echo "✅ Deploy complete!"
ENDSSH
