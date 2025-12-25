import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, VehicleType, CarCategory, Language } from '../../common/enums';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  email?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ type: String, enum: UserRole, required: true })
  role: UserRole;

  @Prop()
  avatar?: string;

  @Prop({ type: String, enum: Language, default: Language.UZ })
  language: Language;

  @Prop({ default: true })
  isActive: boolean;

  // Driver-specific fields
  @Prop()
  licenseNumber?: string;

  @Prop()
  vehicleMake?: string;

  @Prop()
  vehicleModel?: string;

  @Prop()
  vehicleYear?: number;

  @Prop()
  vehicleColor?: string;

  @Prop()
  vehiclePlateNumber?: string;

  @Prop({ type: String, enum: VehicleType })
  vehicleType?: VehicleType;

  @Prop({ type: String, enum: CarCategory })
  carCategory?: CarCategory;

  @Prop()
  payloadCapacity?: number; // kg for delivery vehicles

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isOnline: boolean;

  @Prop({ default: false })
  notificationsEnabled: boolean;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  })
  currentLocation?: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop()
  expoPushToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create geospatial index for location queries
UserSchema.index({ currentLocation: '2dsphere' });
