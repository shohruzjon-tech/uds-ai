import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from './ride.schema';
import { CreateRideDto, UpdateRideDto } from './dto/ride.dto';
import { OrderStatus, TaxiType } from '../../common/enums';

@Injectable()
export class RidesService {
  constructor(@InjectModel(Ride.name) private rideModel: Model<Ride>) {}

  async create(createRideDto: CreateRideDto): Promise<Ride> {
    const rideData: any = {
      ...createRideDto,
      pickupLocation: {
        ...createRideDto.pickupLocation,
        coordinates: {
          type: 'Point',
          coordinates: [
            createRideDto.pickupLocation.longitude,
            createRideDto.pickupLocation.latitude,
          ],
        },
      },
      dropoffLocation: {
        ...createRideDto.dropoffLocation,
        coordinates: {
          type: 'Point',
          coordinates: [
            createRideDto.dropoffLocation.longitude,
            createRideDto.dropoffLocation.latitude,
          ],
        },
      },
    };

    const ride = await this.rideModel.create(rideData);
    return ride;
  }

  async findAll(status?: OrderStatus): Promise<Ride[]> {
    const query = status ? { status } : {};
    return this.rideModel
      .find(query)
      .populate('clientId', 'firstName lastName phone')
      .populate('driverId', 'firstName lastName phone vehiclePlateNumber')
      .exec();
  }

  async findAvailable(taxiType: TaxiType): Promise<Ride[]> {
    return this.rideModel
      .find({
        taxiType,
        status: OrderStatus.PENDING,
        driverId: null,
      })
      .populate('clientId', 'firstName lastName phone')
      .exec();
  }

  async findOne(id: string): Promise<Ride> {
    const ride = await this.rideModel
      .findById(id)
      .populate('clientId', 'firstName lastName phone')
      .populate('driverId', 'firstName lastName phone vehiclePlateNumber')
      .exec();
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    return ride;
  }

  async findByClient(clientId: string): Promise<Ride[]> {
    return this.rideModel
      .find({ clientId })
      .populate('driverId', 'firstName lastName phone vehiclePlateNumber')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByDriver(driverId: string): Promise<Ride[]> {
    return this.rideModel
      .find({ driverId })
      .populate('clientId', 'firstName lastName phone')
      .sort({ createdAt: -1 })
      .exec();
  }

  async acceptRide(id: string, driverId: string): Promise<Ride> {
    const ride = await this.rideModel
      .findByIdAndUpdate(
        id,
        { driverId, status: OrderStatus.ACCEPTED },
        { new: true },
      )
      .exec();
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    return ride;
  }

  async startRide(id: string): Promise<Ride> {
    const ride = await this.rideModel
      .findByIdAndUpdate(
        id,
        { status: OrderStatus.IN_PROGRESS, startedAt: new Date() },
        { new: true },
      )
      .exec();
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    return ride;
  }

  async completeRide(id: string): Promise<Ride> {
    const ride = await this.rideModel
      .findByIdAndUpdate(
        id,
        { status: OrderStatus.COMPLETED, completedAt: new Date() },
        { new: true },
      )
      .exec();
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    return ride;
  }

  async cancelRide(id: string, reason?: string): Promise<Ride> {
    const ride = await this.rideModel
      .findByIdAndUpdate(
        id,
        {
          status: OrderStatus.CANCELLED,
          cancelledAt: new Date(),
          cancellationReason: reason,
        },
        { new: true },
      )
      .exec();
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    return ride;
  }

  async update(id: string, updateRideDto: UpdateRideDto): Promise<Ride> {
    const ride = await this.rideModel
      .findByIdAndUpdate(id, updateRideDto, { new: true })
      .exec();
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    return ride;
  }
}
