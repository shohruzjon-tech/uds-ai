# Deployment Guide

## Backend Deployment

### Option 1: Docker Deployment

1. Build Docker image:
```bash
cd backend
docker build -t uds-go-backend .
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

### Option 2: Manual Deployment

#### Prerequisites
- Node.js 18+
- MongoDB instance
- Redis instance
- PM2 (process manager)

#### Steps

1. Install PM2:
```bash
npm install -g pm2
```

2. Build the application:
```bash
cd backend
npm install
npm run build
```

3. Start with PM2:
```bash
pm2 start dist/main.js --name uds-go-backend
pm2 save
pm2 startup
```

### Option 3: Cloud Platforms

#### Heroku
```bash
heroku create uds-go-backend
heroku addons:create heroku-mongodb:sandbox
heroku addons:create heroku-redis:hobby-dev
git push heroku main
```

#### AWS EC2
1. Launch EC2 instance
2. Install Node.js, MongoDB, Redis
3. Clone repository
4. Set up nginx as reverse proxy
5. Configure SSL with Let's Encrypt

#### DigitalOcean
1. Create droplet
2. Follow manual deployment steps
3. Set up nginx
4. Configure firewall

---

## Mobile Apps Deployment

### Prerequisites
- Expo account
- EAS CLI installed
- App Store and Google Play developer accounts

### Build with EAS

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure builds:
```bash
cd apps/client  # or apps/driver
eas build:configure
```

4. Build for Android:
```bash
eas build --platform android
```

5. Build for iOS:
```bash
eas build --platform ios
```

### Submit to Stores

#### Google Play Store
```bash
eas submit --platform android
```

#### Apple App Store
```bash
eas submit --platform ios
```

### OTA Updates

Configure OTA updates in `eas.json`:
```json
{
  "build": {
    "production": {
      "channel": "production"
    }
  }
}
```

Publish update:
```bash
eas update --branch production --message "Bug fixes"
```

---

## Admin Dashboard Deployment

### Option 1: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd admin
vercel
```

3. Set environment variables in Vercel dashboard

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 3: Self-hosted

1. Build:
```bash
npm run build
```

2. Start:
```bash
npm start
```

3. Set up nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name admin.udsgo.uz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Database Migration

### MongoDB Atlas Setup

1. Create cluster at https://cloud.mongodb.com
2. Add IP whitelist
3. Create database user
4. Get connection string
5. Update MONGODB_URI in .env

### Backup Strategy

```bash
# Backup
mongodump --uri="mongodb://..." --out=/backup

# Restore
mongorestore --uri="mongodb://..." /backup
```

---

## SSL/HTTPS Setup

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.udsgo.uz

# Auto-renewal
sudo certbot renew --dry-run
```

---

## Monitoring and Logging

### PM2 Monitoring

```bash
pm2 monit
pm2 logs uds-go-backend
```

### Sentry Setup

1. Create account at https://sentry.io
2. Install SDK:
```bash
npm install @sentry/node
```

3. Configure in `main.ts`:
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'your-sentry-dsn',
});
```

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/uds-go/backend
            git pull
            npm install
            npm run build
            pm2 restart uds-go-backend

  deploy-admin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and deploy
        run: |
          cd admin
          npm install
          npm run build
          # Deploy to hosting
```

---

## Performance Optimization

### Backend
- Enable compression
- Use Redis caching
- Implement connection pooling
- Enable cluster mode

### Mobile Apps
- Optimize images
- Implement code splitting
- Use React Native performance tools
- Enable Hermes engine

### Admin Dashboard
- Enable SSG where possible
- Optimize images with Next.js Image
- Implement lazy loading
- Use CDN for static assets

---

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Implement rate limiting
- [ ] Enable CORS with specific origins
- [ ] Use environment variables for secrets
- [ ] Implement input validation
- [ ] Enable SQL injection protection
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Implement logging and monitoring
- [ ] Set up backup strategy
- [ ] Enable 2FA for admin accounts
- [ ] Implement API key rotation

---

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify Redis is running
- Check environment variables
- Review logs: `pm2 logs`

### Mobile app crashes
- Check API URL configuration
- Verify Expo SDK version
- Clear cache: `expo start -c`
- Check device logs

### Database connection issues
- Verify MongoDB URI
- Check network connectivity
- Ensure IP whitelist includes server
- Verify credentials

---

## Support

For deployment assistance:
- Email: devops@udsgo.uz
- Telegram: @udsgo_support
- Documentation: https://docs.udsgo.uz
