#!/bin/bash
# Deploy script for Astro site - run this on your EC2 server
# Lives in the repo, so: cd /var/www/Web2025Build && ./deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Deploying Astro site..."

echo "📥 Pulling latest from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Astro site..."
npm run build

echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deploy complete! Site updated."
