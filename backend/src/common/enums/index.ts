export enum UserRole {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}

export enum VehicleType {
  CAR = 'CAR',
  VAN = 'VAN',
  TRUCK = 'TRUCK',
}

export enum CarCategory {
  START = 'START',
  COMFORT = 'COMFORT',
  BUSINESS = 'BUSINESS',
  PREMIUM = 'PREMIUM',
}

export enum ServiceType {
  TAXI = 'TAXI',
  DELIVERY = 'DELIVERY',
}

export enum TaxiType {
  REGION_INTERNAL = 'REGION_INTERNAL',
  REGIONAL_ROUTES = 'REGIONAL_ROUTES',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  POD = 'POD', // Pay on Delivery
  PAYME = 'PAYME',
  CLICK = 'CLICK',
  WALLET = 'WALLET',
}

export enum TransactionType {
  TOPUP = 'TOPUP',
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  WITHDRAWAL = 'WITHDRAWAL',
  EARNING = 'EARNING',
}

export enum Language {
  UZ = 'uz',
  EN = 'en',
  RU = 'ru',
}

export enum Platform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export enum AppType {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
}
