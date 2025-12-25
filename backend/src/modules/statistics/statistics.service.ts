import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from '../rides/ride.schema';
import { Delivery } from '../deliveries/delivery.schema';
import { User } from '../users/user.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Ride.name) private rideModel: Model<Ride>,
    @InjectModel(Delivery.name) private deliveryModel: Model<Delivery>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getDashboardStats() {
    const [totalRides, totalDeliveries, totalDrivers, totalClients] =
      await Promise.all([
        this.rideModel.countDocuments().exec(),
        this.deliveryModel.countDocuments().exec(),
        this.userModel.countDocuments({ role: 'DRIVER' }).exec(),
        this.userModel.countDocuments({ role: 'CLIENT' }).exec(),
      ]);

    return {
      totalRides,
      totalDeliveries,
      totalDrivers,
      totalClients,
    };
  }

  async getDriverStats(driverId: string) {
    const rides = await this.rideModel
      .find({ driverId, status: 'COMPLETED' })
      .exec();
    const deliveries = await this.deliveryModel
      .find({ driverId, status: 'COMPLETED' })
      .exec();

    const totalEarnings =
      rides.reduce((sum, ride) => sum + (ride.totalPrice || 0), 0) +
      deliveries.reduce((sum, del) => sum + (del.totalPrice || 0), 0);

    return {
      totalRides: rides.length,
      totalDeliveries: deliveries.length,
      totalEarnings,
    };
  }
}
