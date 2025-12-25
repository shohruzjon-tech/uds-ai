# Environment Configuration Template

## Backend Environment Variables

Copy this file to `.env` in the backend directory and fill in your values.

```bash
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
MONGODB_URI=mongodb://localhost:27017/uds-go

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key-here-change-this-in-production
JWT_EXPIRES_IN=7d

# Eskiz.uz SMS Service
# Get credentials from https://eskiz.uz
ESKIZ_EMAIL=your-email@example.com
ESKIZ_PASSWORD=your-password
ESKIZ_API_URL=https://notify.eskiz.uz/api

# OpenAI
# Get API key from https://platform.openai.com
OPENAI_API_KEY=sk-your-openai-api-key

# Expo Push Notifications
# Get access token from https://expo.dev
EXPO_ACCESS_TOKEN=your-expo-access-token

# Payment Gateways
# PAYME - Get credentials from https://payme.uz
PAYME_MERCHANT_ID=your-payme-merchant-id
PAYME_SECRET_KEY=your-payme-secret-key

# CLICK - Get credentials from https://click.uz
CLICK_MERCHANT_ID=your-click-merchant-id
CLICK_SECRET_KEY=your-click-secret-key

# Google Maps
# Get API key from https://console.cloud.google.com
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## Client App Environment

Update `apps/client/src/services/api.ts`:

```typescript
const API_URL = 'http://your-backend-url:3000/api/v1';
```

Update `apps/client/app.json`:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

## Driver App Environment

Update `apps/driver/src/services/api.ts`:

```typescript
const API_URL = 'http://your-backend-url:3000/api/v1';
```

Update `apps/driver/app.json`:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

## Admin Dashboard Environment

Update `admin/src/services/api.ts`:

```typescript
const API_URL = 'http://your-backend-url:3000/api/v1';
```

## Production Considerations

### Security
- Use strong, unique JWT secret
- Enable HTTPS in production
- Restrict CORS origins
- Use environment-specific credentials
- Never commit `.env` files to version control

### Database
- Use MongoDB Atlas for managed database
- Enable authentication and authorization
- Set up regular backups
- Use connection pooling

### Redis
- Use Redis Cloud or managed Redis
- Enable persistence
- Set up replication for high availability

### API Keys
- Rotate keys regularly
- Use different keys for development and production
- Monitor API usage and set up alerts
- Restrict API key permissions

### Monitoring
- Set up error tracking (Sentry, Rollbar)
- Monitor API performance
- Set up logging (Winston, Bunyan)
- Track user analytics

### Scaling
- Use load balancer
- Enable horizontal scaling
- Use CDN for static assets
- Implement caching strategy
