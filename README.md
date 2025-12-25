# UDS GO - Complete Delivery and Taxi System

UDS GO is a comprehensive delivery and taxi system built with modern technologies, inspired by Uber and Bolt. The system consists of three main components: Backend API, Mobile Apps (Driver & Client), and Admin Dashboard.

## 🚀 Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: MongoDB
- **Caching**: Redis
- **Real-time**: Socket.IO
- **Push Notifications**: Expo Push Notification Service
- **AI Integration**: OpenAI for smart pricing and matching

### Mobile Apps (Client & Driver)
- **Framework**: Expo (React Native)
- **State Management**: Redux Toolkit (RTK Query)
- **Navigation**: React Navigation
- **Maps**: Yandex Maps
- **Authentication**: Custom OTP with eskiz.uz SMS service
- **Platform**: Android/iOS optimized

### Admin Dashboard
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit (RTK Query)
- **Styling**: Tailwind CSS

## 📋 Core Features

### 1. Taxi Service Types
- **Region Internal**: Taxis operating within a single city
- **Regional Routes**: Taxis operating between different cities
- **Car Categories**: START, COMFORT, BUSINESS, PREMIUM

### 2. Delivery Service
- **Vehicle Types**: CAR, VAN, TRUCK
- **Payload Calculation**: Intelligent weight/dimension-based vehicle matching

### 3. Client App Features
- Wallet system with multiple payment methods (CASH, POD, PAYME, CLICK)
- Scheduled orders
- Real-time order tracking
- Transaction history
- Multi-language support (uz, en, ru)

### 4. Driver App Features
- Manual pricing control
- Earnings tracking
- Performance statistics
- Order management (delivery & passenger)
- Navigation integration
- Toggle notifications

### 5. Admin Dashboard Features
- User management (clients, drivers, admins)
- Rides & deliveries monitoring
- Statistics and analytics
- App version control
- System configuration
- Pricing management

## 🏗️ Project Structure

```
uds-go/
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # OTP authentication
│   │   │   ├── users/         # User management
│   │   │   ├── rides/         # Taxi rides
│   │   │   ├── deliveries/    # Delivery orders
│   │   │   ├── wallet/        # Wallet & transactions
│   │   │   ├── payments/      # Payment gateways
│   │   │   ├── pricing/       # Pricing engine
│   │   │   ├── notifications/ # Push notifications
│   │   │   ├── websocket/     # Real-time updates
│   │   │   ├── statistics/    # Analytics
│   │   │   ├── config/        # Configuration
│   │   │   └── ai/            # OpenAI integration
│   │   └── main.ts
│   ├── docker-compose.yml
│   └── package.json
│
├── apps/
│   ├── client/                # Expo Client App
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   ├── services/
│   │   │   ├── navigation/
│   │   │   ├── theme/
│   │   │   └── i18n/
│   │   └── App.tsx
│   │
│   └── driver/                # Expo Driver App
│       ├── src/
│       │   ├── screens/
│       │   ├── components/
│       │   ├── store/
│       │   ├── services/
│       │   ├── navigation/
│       │   └── i18n/
│       └── App.tsx
│
└── admin/                     # Next.js Admin Dashboard
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── store/
    │   └── services/
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB 7+
- Redis 7+
- Expo CLI (for mobile apps)
- Docker & Docker Compose (optional)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
- MongoDB URI
- Redis configuration
- JWT secret
- Eskiz.uz SMS credentials
- OpenAI API key
- Payment gateway credentials
- Yandex Maps API key

5. Start MongoDB and Redis (using Docker):
```bash
docker-compose up -d
```

6. Run the backend:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`

### Client App Setup

1. Navigate to client app directory:
```bash
cd apps/client
```

2. Install dependencies:
```bash
npm install
```

3. Update `src/services/api.ts` with your backend URL

4. Start the app:
```bash
npm start
```

5. Run on device:
```bash
npm run android  # For Android
npm run ios      # For iOS
```

### Driver App Setup

1. Navigate to driver app directory:
```bash
cd apps/driver
```

2. Install dependencies:
```bash
npm install
```

3. Update `src/services/api.ts` with your backend URL

4. Start the app:
```bash
npm start
```

5. Run on device:
```bash
npm run android  # For Android
npm run ios      # For iOS
```

### Admin Dashboard Setup

1. Navigate to admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Update `src/services/api.ts` with your backend URL

4. Run the dashboard:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 📱 Mobile App Configuration

### Yandex Maps Setup

1. Get API keys from [Google Cloud Console](https://console.cloud.google.com/)
2. Update `app.json` in both client and driver apps with your API keys

### Expo Push Notifications

1. Create an Expo account
2. Get push notification credentials
3. Update backend `.env` with Expo access token

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/send-otp` - Send OTP
- `POST /api/v1/auth/verify-otp` - Verify OTP

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `PATCH /api/v1/users/:id/location` - Update location

### Rides
- `POST /api/v1/rides` - Create ride
- `GET /api/v1/rides/available` - Get available rides
- `PATCH /api/v1/rides/:id/accept` - Accept ride
- `PATCH /api/v1/rides/:id/start` - Start ride
- `PATCH /api/v1/rides/:id/complete` - Complete ride

### Deliveries
- `POST /api/v1/deliveries` - Create delivery
- `GET /api/v1/deliveries` - Get deliveries
- `POST /api/v1/deliveries/calculate-payload` - Calculate payload

### Wallet
- `GET /api/v1/wallet/:userId` - Get wallet
- `GET /api/v1/wallet/:userId/transactions` - Get transactions

### Statistics
- `GET /api/v1/statistics/dashboard` - Get dashboard stats
- `GET /api/v1/statistics/driver/:driverId` - Get driver stats

### Configuration
- `GET /api/v1/config` - Get configuration
- `POST /api/v1/config` - Set configuration
- `GET /api/v1/config/version` - Get app version
- `POST /api/v1/config/version` - Create app version

## 🌐 Localization

The system supports three languages:
- **Uzbek (uz)** - Default
- **English (en)**
- **Russian (ru)**

All apps and dashboard have full translation coverage.

## 🔒 Security Features

- JWT authentication
- Role-based access control (CLIENT, DRIVER, ADMIN)
- OTP verification via SMS
- Rate limiting
- Input validation
- Secure payment processing

## 📊 Database Schema

### Collections
- **Users** - Client, driver, and admin profiles
- **Rides** - Taxi orders and tracking
- **Deliveries** - Delivery orders
- **Wallets** - User balances
- **Transactions** - Financial transactions
- **Configurations** - System settings
- **AppVersions** - Version control

## 🤖 AI Integration

OpenAI is integrated for:
- Smart pricing suggestions based on distance, duration, and market rates
- Intelligent driver-passenger matching
- Dynamic pricing optimization

## 🔄 Real-time Features

Socket.IO powers:
- Driver location tracking
- Order status updates
- New order notifications
- Driver-client communication

## 🎨 Theming

Both mobile apps support:
- Light mode
- Dark mode
- Automatic switching based on system preference

## 📦 Deployment

### Backend
- Deploy to any Node.js hosting (AWS, Heroku, DigitalOcean, etc.)
- Ensure MongoDB and Redis are accessible
- Set environment variables

### Mobile Apps
- Build with Expo EAS Build
- Submit to Google Play Store and Apple App Store
- Configure OTA updates

### Admin Dashboard
- Deploy to Vercel, Netlify, or any Next.js hosting
- Set API URL in environment variables

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@udsgo.uz or join our Telegram channel.

## 🎯 Roadmap

- [ ] Payment gateway integration (PAYME, CLICK)
- [ ] Advanced analytics dashboard
- [ ] Driver rating system
- [ ] In-app chat
- [ ] Route optimization
- [ ] Multi-currency support
- [ ] Promotional campaigns
- [ ] Referral system

---

Built with ❤️ by UDS Team