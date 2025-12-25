# UDS GO API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Send OTP
Send OTP code to phone number via SMS.

**Endpoint:** `POST /auth/send-otp`

**Request Body:**
```json
{
  "phone": "+998901234567"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully"
}
```

### Verify OTP
Verify OTP code and get access token.

**Endpoint:** `POST /auth/verify-otp`

**Request Body:**
```json
{
  "phone": "+998901234567",
  "code": "123456"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "OTP verified successfully"
}
```

---

## Users Endpoints

### Create User
Create a new user (client, driver, or admin).

**Endpoint:** `POST /users`

**Request Body:**
```json
{
  "phone": "+998901234567",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CLIENT",
  "email": "john@example.com",
  "language": "uz"
}
```

### Get All Users
Get list of all users with optional role filter.

**Endpoint:** `GET /users?role=DRIVER`

**Query Parameters:**
- `role` (optional): Filter by role (CLIENT, DRIVER, ADMIN)

### Get User by ID
**Endpoint:** `GET /users/:id`

### Update User
**Endpoint:** `PATCH /users/:id`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "notificationsEnabled": true
}
```

### Update User Location
Update driver's current location for tracking.

**Endpoint:** `PATCH /users/:id/location`

**Request Body:**
```json
{
  "latitude": 41.2995,
  "longitude": 69.2401
}
```

### Set Online Status
**Endpoint:** `PATCH /users/:id/online`

**Request Body:**
```json
{
  "isOnline": true
}
```

### Find Nearby Drivers
Find drivers near a specific location.

**Endpoint:** `GET /users/drivers/nearby`

**Query Parameters:**
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate
- `maxDistance` (optional): Maximum distance in meters (default: 5000)
- `vehicleType` (optional): Filter by vehicle type

---

## Rides Endpoints

### Create Ride
Create a new taxi ride request.

**Endpoint:** `POST /rides`

**Request Body:**
```json
{
  "clientId": "user_id",
  "taxiType": "REGION_INTERNAL",
  "carCategory": "COMFORT",
  "pickupLocation": {
    "street": "Amir Temur Ave",
    "city": "Tashkent",
    "latitude": 41.2995,
    "longitude": 69.2401
  },
  "dropoffLocation": {
    "street": "Mustaqillik Square",
    "city": "Tashkent",
    "latitude": 41.3111,
    "longitude": 69.2797
  },
  "numberOfPassengers": 2,
  "paymentMethod": "CASH",
  "notes": "Please call when arrived"
}
```

### Get All Rides
**Endpoint:** `GET /rides?status=PENDING`

**Query Parameters:**
- `status` (optional): Filter by status

### Get Available Rides
Get rides available for drivers to accept.

**Endpoint:** `GET /rides/available?taxiType=REGION_INTERNAL`

**Query Parameters:**
- `taxiType`: Type of taxi service

### Get Ride by ID
**Endpoint:** `GET /rides/:id`

### Get Client's Rides
**Endpoint:** `GET /rides/client/:clientId`

### Get Driver's Rides
**Endpoint:** `GET /rides/driver/:driverId`

### Accept Ride
Driver accepts a ride request.

**Endpoint:** `PATCH /rides/:id/accept`

**Request Body:**
```json
{
  "driverId": "driver_id"
}
```

### Start Ride
Driver starts the ride.

**Endpoint:** `PATCH /rides/:id/start`

### Complete Ride
Driver completes the ride.

**Endpoint:** `PATCH /rides/:id/complete`

### Cancel Ride
Cancel a ride request.

**Endpoint:** `PATCH /rides/:id/cancel`

**Request Body:**
```json
{
  "reason": "Client cancelled"
}
```

---

## Deliveries Endpoints

### Create Delivery
Create a new delivery order.

**Endpoint:** `POST /deliveries`

**Request Body:**
```json
{
  "clientId": "user_id",
  "vehicleType": "VAN",
  "pickupLocation": {
    "street": "Buyuk Ipak Yoli",
    "city": "Tashkent",
    "latitude": 41.2995,
    "longitude": 69.2401
  },
  "dropoffLocation": {
    "street": "Amir Temur Ave",
    "city": "Tashkent",
    "latitude": 41.3111,
    "longitude": 69.2797
  },
  "weight": 50,
  "length": 100,
  "width": 80,
  "height": 60,
  "description": "Furniture delivery",
  "paymentMethod": "POD"
}
```

### Get All Deliveries
**Endpoint:** `GET /deliveries`

### Get Delivery by ID
**Endpoint:** `GET /deliveries/:id`

### Calculate Payload
Check which vehicles can handle the payload.

**Endpoint:** `POST /deliveries/calculate-payload`

**Request Body:**
```json
{
  "weight": 50,
  "length": 100,
  "width": 80,
  "height": 60
}
```

**Response:**
```json
{
  "canFit": true,
  "vehicleTypes": ["CAR", "VAN", "TRUCK"]
}
```

---

## Wallet Endpoints

### Get Wallet
Get user's wallet information.

**Endpoint:** `GET /wallet/:userId`

**Response:**
```json
{
  "_id": "wallet_id",
  "userId": "user_id",
  "balance": 50000,
  "currency": "UZS"
}
```

### Get Balance
**Endpoint:** `GET /wallet/:userId/balance`

**Response:**
```json
50000
```

### Get Transactions
Get wallet transaction history.

**Endpoint:** `GET /wallet/:userId/transactions`

**Response:**
```json
[
  {
    "_id": "transaction_id",
    "walletId": "wallet_id",
    "type": "TOPUP",
    "amount": 50000,
    "paymentMethod": "PAYME",
    "balanceAfter": 50000,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## Statistics Endpoints

### Get Dashboard Statistics
Get overall system statistics.

**Endpoint:** `GET /statistics/dashboard`

**Response:**
```json
{
  "totalRides": 1234,
  "totalDeliveries": 567,
  "totalDrivers": 89,
  "totalClients": 456
}
```

### Get Driver Statistics
Get specific driver's performance stats.

**Endpoint:** `GET /statistics/driver/:driverId`

**Response:**
```json
{
  "totalRides": 45,
  "totalDeliveries": 23,
  "totalEarnings": 1500000
}
```

---

## Configuration Endpoints

### Get Configuration
Get system configuration by key.

**Endpoint:** `GET /config?key=pricing`

### Set Configuration
Update system configuration.

**Endpoint:** `POST /config`

**Request Body:**
```json
{
  "key": "pricing",
  "value": {
    "basePrice": 5000,
    "pricePerKm": 2000,
    "pricePerMinute": 500
  },
  "description": "Pricing configuration"
}
```

### Get App Version
Get current app version for specific platform and app type.

**Endpoint:** `GET /config/version?platform=ANDROID&appType=CLIENT`

**Response:**
```json
{
  "_id": "version_id",
  "platform": "ANDROID",
  "appType": "CLIENT",
  "version": "1.0.0",
  "buildNumber": 1,
  "forceUpdate": false,
  "isActive": true
}
```

### Create App Version
Create new app version entry.

**Endpoint:** `POST /config/version`

**Request Body:**
```json
{
  "platform": "ANDROID",
  "appType": "CLIENT",
  "version": "1.1.0",
  "buildNumber": 2,
  "forceUpdate": true,
  "releaseNotes": "Bug fixes and improvements"
}
```

---

## WebSocket Events

### Client Events

#### register
Register user socket connection.
```javascript
socket.emit('register', userId);
```

#### location_update
Send driver location update.
```javascript
socket.emit('location_update', {
  userId: 'driver_id',
  latitude: 41.2995,
  longitude: 69.2401
});
```

### Server Events

#### order_update
Receive order status update.
```javascript
socket.on('order_update', (order) => {
  console.log('Order updated:', order);
});
```

#### new_order
Receive new order notification (driver).
```javascript
socket.on('new_order', (order) => {
  console.log('New order:', order);
});
```

#### driver_location
Receive driver location update (client).
```javascript
socket.on('driver_location', (data) => {
  console.log('Driver location:', data);
});
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["phone must be a valid phone number"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid or expired OTP",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute
- WebSocket connections: 50 per user

---

## Pagination

List endpoints support pagination:
```
GET /users?page=1&limit=20
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response includes:**
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

---

## Maps Endpoints (Yandex Maps)

### Geocode Address
Convert address to coordinates using Yandex Maps.

**Endpoint:** `GET /maps/geocode`

**Query Parameters:**
- `address`: Address to geocode

**Response:**
```json
{
  "address": "Amir Temur Avenue, Tashkent, Uzbekistan",
  "coordinates": {
    "latitude": 41.2995,
    "longitude": 69.2401
  },
  "city": "Tashkent",
  "region": "Tashkent Region"
}
```

### Reverse Geocode
Convert coordinates to address using Yandex Maps.

**Endpoint:** `GET /maps/reverse-geocode`

**Query Parameters:**
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate

**Response:**
```json
{
  "address": "Amir Temur Avenue, Tashkent, Uzbekistan",
  "city": "Tashkent",
  "region": "Tashkent Region",
  "street": "Amir Temur Avenue"
}
```

### Get Location Suggestions
Get location suggestions with autocomplete using Yandex Maps.

**Endpoint:** `GET /maps/suggest`

**Query Parameters:**
- `text`: Search text for suggestions
- `ll` (optional): Center point as "longitude,latitude"
- `spn` (optional): Search area span as "longitude_span,latitude_span"

**Response:**
```json
[
  {
    "title": "Amir Temur Square",
    "subtitle": "Tashkent, Uzbekistan",
    "uri": "ymapsbm1://geo?ll=69.240,41.299&spn=0.01,0.01",
    "distance": 1234
  }
]
```

### Calculate Route
Calculate route between two points using Yandex Maps Router API.

**Endpoint:** `GET /maps/route`

**Query Parameters:**
- `fromLat`: Starting latitude
- `fromLng`: Starting longitude
- `toLat`: Destination latitude
- `toLng`: Destination longitude
- `mode` (optional): Travel mode - `auto`, `pedestrian`, or `bicycle` (default: `auto`)

**Response:**
```json
{
  "distance": 5420,
  "duration": 1260,
  "geometry": [
    {
      "distance": 150,
      "duration": 30,
      "polyline": "..."
    }
  ]
}
```

---

## Regional and City Statistics

### Get Regional Statistics
Get aggregated statistics by region for both rides and deliveries.

**Endpoint:** `GET /statistics/regional`

**Response:**
```json
{
  "rides": [
    {
      "region": "Tashkent Region",
      "totalRides": 1234,
      "completedRides": 1100,
      "totalRevenue": 12500000
    }
  ],
  "deliveries": [
    {
      "region": "Tashkent Region",
      "totalDeliveries": 567,
      "completedDeliveries": 520,
      "totalRevenue": 8500000
    }
  ]
}
```

### Get City Statistics
Get aggregated statistics by city for both rides and deliveries.

**Endpoint:** `GET /statistics/city`

**Response:**
```json
{
  "rides": [
    {
      "city": "Tashkent",
      "region": "Tashkent Region",
      "totalRides": 1000,
      "completedRides": 900,
      "totalRevenue": 10000000
    }
  ],
  "deliveries": [
    {
      "city": "Tashkent",
      "region": "Tashkent Region",
      "totalDeliveries": 450,
      "completedDeliveries": 420,
      "totalRevenue": 7000000
    }
  ]
}
```

### Get Region Statistics by Service
Get detailed statistics for a specific region, broken down by service type.

**Endpoint:** `GET /statistics/region/:region`

**Example:** `GET /statistics/region/Tashkent%20Region`

**Response:**
```json
{
  "region": "Tashkent Region",
  "rides": {
    "total": 1234,
    "completed": 1100,
    "pending": 50,
    "inProgress": 84,
    "totalRevenue": 12500000
  },
  "deliveries": {
    "total": 567,
    "completed": 520,
    "pending": 20,
    "inProgress": 27,
    "totalRevenue": 8500000
  }
}
```

### Get City Statistics by Service
Get detailed statistics for a specific city, broken down by service type.

**Endpoint:** `GET /statistics/city/:city`

**Query Parameters:**
- `region` (optional): Filter by region name

**Example:** `GET /statistics/city/Tashkent?region=Tashkent%20Region`

**Response:**
```json
{
  "city": "Tashkent",
  "region": "Tashkent Region",
  "rides": {
    "total": 1000,
    "completed": 900,
    "pending": 40,
    "inProgress": 60,
    "totalRevenue": 10000000
  },
  "deliveries": {
    "total": 450,
    "completed": 420,
    "pending": 15,
    "inProgress": 15,
    "totalRevenue": 7000000
  }
}
```
