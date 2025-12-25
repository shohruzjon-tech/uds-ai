import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderStatus, PaymentMethod, VehicleType } from '../../common/enums';

@Schema({ timestamps: true })
export class Delivery extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  clientId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  driverId?: string;

  @Prop({ type: String, enum: VehicleType, required: true })
  vehicleType: VehicleType;

  @Prop({
    type: {
      street: String,
      city: { type: String, required: true },
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
      },
    },
    required: true,
  })
  pickupLocation: any;

  @Prop({
    type: {
      street: String,
      city: { type: String, required: true },
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
      },
    },
    required: true,
  })
  dropoffLocation: any;

  @Prop({ required: true })
  weight: number; // kg

  @Prop()
  length?: number; // cm

  @Prop()
  width?: number; // cm

  @Prop()
  height?: number; // cm

  @Prop()
  pricePerKg?: number;

  @Prop()
  totalPrice?: number;

  @Prop()
  distance?: number;

  @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.POD })
  paymentMethod: PaymentMethod;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop()
  description?: string;

  @Prop()
  scheduledTime?: Date;

  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  cancelledAt?: Date;

  @Prop()
  cancellationReason?: string;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
