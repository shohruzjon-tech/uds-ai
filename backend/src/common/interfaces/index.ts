export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Address {
  street?: string;
  city: string;
  region?: string;
  country?: string;
  postalCode?: string;
  coordinates: Location;
}

export interface PayloadDimensions {
  weight: number; // kg
  length?: number; // cm
  width?: number; // cm
  height?: number; // cm
}

export interface PriceBreakdown {
  basePrice: number;
  distancePrice: number;
  timePrice?: number;
  surcharge?: number;
  discount?: number;
  total: number;
}
