import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Platform, AppType } from '../../common/enums';

@Schema({ timestamps: true })
export class Configuration extends Document {
  @Prop({ required: true })
  key: string;

  @Prop({ type: Object })
  value: any;

  @Prop()
  description?: string;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);

@Schema({ timestamps: true })
export class AppVersion extends Document {
  @Prop({ type: String, enum: Platform, required: true })
  platform: Platform;

  @Prop({ type: String, enum: AppType, required: true })
  appType: AppType;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  buildNumber: number;

  @Prop({ default: false })
  forceUpdate: boolean;

  @Prop()
  releaseNotes?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const AppVersionSchema = SchemaFactory.createForClass(AppVersion);
