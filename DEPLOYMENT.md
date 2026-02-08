# Deployment Guide — Astro Site → AWS EC2

## Your Setup
- **EC2:** `ubuntu@3.130.34.6`
- **PEM:** `AaryamanNew.pem`
- **Project path on server:** `/var/www/Web2025Build`
- **Domain:** aaryamansingh.com
- **GitHub (deploy repo):** https://github.com/aaryamanz/Web2025Build.git

---

## Important: Astro Build Output

Astro outputs static files to the **`dist/`** folder. Nginx must serve from there.

**Nginx config** (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name aaryamansingh.com www.aaryamansingh.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name aaryamansingh.com www.aaryamansingh.com;

    root /var/www/Web2025Build/dist;   # ← Must point to dist/
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # SSL config from certbot...
}
```

---

## Workflow

### Step 1: Push source to Web2025Build (from your Mac)

Your current project is the **source**. Push it to Web2025Build:

```bash
cd /Users/aaryamansingh/Desktop/Web

# Add Web2025Build as remote (one-time)
git remote add deploy https://github.com/aaryamanz/Web2025Build.git

# Push your code
git push deploy main
```

### Step 2: Deploy on EC2

**Option A — One command from Mac:**
```bash
./deploy-remote.sh
```
(Edit `deploy-remote.sh` to set the correct PEM path.)

**Option B — SSH and run:**
```bash
ssh -i AaryamanNew.pem ubuntu@3.130.34.6
cd /var/www/Web2025Build
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

**Option C — Deploy script on server:**
Copy `deploy.sh` to your server, then:
```bash
ssh -i AaryamanNew.pem ubuntu@3.130.34.6
chmod +x /var/www/deploy.sh
/var/www/deploy.sh
```

---

## One-Time Server Setup

If Web2025Build isn’t cloned yet:

```bash
ssh -i AaryamanNew.pem ubuntu@3.130.34.6

cd /var/www
sudo git clone https://github.com/aaryamanz/Web2025Build.git Web2025Build
sudo chown -R ubuntu:ubuntu Web2025Build
cd Web2025Build
npm install
npm run build
```

Then configure Nginx to use `/var/www/Web2025Build/dist` as `root`.

---

## Checklist

- [ ] Web2025Build contains your Astro **source** (not pre-built files)
- [ ] Nginx `root` is `/var/www/Web2025Build/dist`
- [ ] `git push deploy main` sends your local changes to Web2025Build
- [ ] EC2 has Node.js 18+ (`node -v`)
