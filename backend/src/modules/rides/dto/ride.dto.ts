import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaxiType, CarCategory, PaymentMethod, OrderStatus } from '../../../common/enums';

class LocationDto {
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class CreateRideDto {
  @IsString()
  clientId: string;

  @IsEnum(TaxiType)
  taxiType: TaxiType;

  @IsEnum(CarCategory)
  @IsOptional()
  carCategory?: CarCategory;

  @ValidateNested()
  @Type(() => LocationDto)
  pickupLocation: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  dropoffLocation: LocationDto;

  @IsDateString()
  @IsOptional()
  scheduledTime?: string;

  @IsNumber()
  @Min(1)
  numberOfPassengers: number;

  @IsNumber()
  @IsOptional()
  pricePerSeat?: number;

  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateRideDto {
  @IsString()
  @IsOptional()
  driverId?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;

  @IsString()
  @IsOptional()
  cancellationReason?: string;
}
