import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery } from './delivery.schema';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectModel(Delivery.name) private deliveryModel: Model<Delivery>,
  ) {}

  async create(createDeliveryDto: any): Promise<Delivery> {
    const delivery = await this.deliveryModel.create(createDeliveryDto);
    return delivery;
  }

  async findAll(): Promise<Delivery[]> {
    return this.deliveryModel
      .find()
      .populate('clientId', 'firstName lastName phone')
      .populate('driverId', 'firstName lastName phone vehiclePlateNumber')
      .exec();
  }

  async findOne(id: string): Promise<Delivery> {
    return this.deliveryModel
      .findById(id)
      .populate('clientId driverId')
      .exec();
  }

  async calculatePayload(
    weight: number,
    length?: number,
    width?: number,
    height?: number,
  ): Promise<{ canFit: boolean; vehicleTypes: string[] }> {
    const vehicleCapacities = {
      CAR: { maxWeight: 500, maxVolume: 1000 },
      VAN: { maxWeight: 1500, maxVolume: 5000 },
      TRUCK: { maxWeight: 5000, maxVolume: 20000 },
    };

    const volume = length && width && height ? length * width * height : 0;
    const canFit: string[] = [];

    Object.entries(vehicleCapacities).forEach(([type, capacity]) => {
      if (
        weight <= capacity.maxWeight &&
        (!volume || volume <= capacity.maxVolume)
      ) {
        canFit.push(type);
      }
    });

    return {
      canFit: canFit.length > 0,
      vehicleTypes: canFit,
    };
  }
}
