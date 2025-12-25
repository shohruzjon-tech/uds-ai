import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TransactionType, PaymentMethod } from '../../common/enums';

@Schema({ timestamps: true })
export class Wallet extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 'UZS' })
  currency: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Wallet', required: true })
  walletId: string;

  @Prop({ type: String, enum: TransactionType, required: true })
  type: TransactionType;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: String, enum: PaymentMethod })
  paymentMethod?: PaymentMethod;

  @Prop()
  referenceId?: string;

  @Prop()
  description?: string;

  @Prop({ default: 0 })
  balanceAfter: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
