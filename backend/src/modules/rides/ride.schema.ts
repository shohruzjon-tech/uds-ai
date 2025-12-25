import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderStatus, PaymentMethod, TaxiType, CarCategory } from '../../common/enums';

@Schema({ timestamps: true })
export class Ride extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  clientId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  driverId?: string;

  @Prop({ type: String, enum: TaxiType, required: true })
  taxiType: TaxiType;

  @Prop({ type: String, enum: CarCategory })
  carCategory?: CarCategory;

  @Prop({
    type: {
      street: String,
      city: { type: String, required: true },
      region: String,
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
      region: String,
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
      },
    },
    required: true,
  })
  dropoffLocation: any;

  @Prop()
  scheduledTime?: Date;

  @Prop({ required: true })
  numberOfPassengers: number;

  @Prop()
  distance?: number; // km

  @Prop()
  duration?: number; // minutes

  @Prop()
  pricePerSeat?: number; // For regional routes

  @Prop()
  totalPrice?: number;

  @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.CASH })
  paymentMethod: PaymentMethod;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop()
  notes?: string;

  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  cancelledAt?: Date;

  @Prop()
  cancellationReason?: string;
}

export const RideSchema = SchemaFactory.createForClass(Ride);
