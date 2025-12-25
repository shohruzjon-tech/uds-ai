import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from '../rides/ride.schema';
import { Delivery } from '../deliveries/delivery.schema';
import { User } from '../users/user.schema';
import { ServiceType } from '../../common/enums';

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

  async getRegionalStats() {
    // Get statistics by region for rides
    const ridesByRegion = await this.rideModel.aggregate([
      {
        $group: {
          _id: '$pickupLocation.region',
          totalRides: { $sum: 1 },
          completedRides: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
          },
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          region: '$_id',
          totalRides: 1,
          completedRides: 1,
          totalRevenue: 1,
        },
      },
    ]);

    // Get statistics by region for deliveries
    const deliveriesByRegion = await this.deliveryModel.aggregate([
      {
        $group: {
          _id: '$pickupLocation.region',
          totalDeliveries: { $sum: 1 },
          completedDeliveries: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
          },
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          region: '$_id',
          totalDeliveries: 1,
          completedDeliveries: 1,
          totalRevenue: 1,
        },
      },
    ]);

    return {
      rides: ridesByRegion,
      deliveries: deliveriesByRegion,
    };
  }

  async getCityStats() {
    // Get statistics by city for rides
    const ridesByCity = await this.rideModel.aggregate([
      {
        $group: {
          _id: {
            city: '$pickupLocation.city',
            region: '$pickupLocation.region',
          },
          totalRides: { $sum: 1 },
          completedRides: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
          },
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          city: '$_id.city',
          region: '$_id.region',
          totalRides: 1,
          completedRides: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { totalRides: -1 } },
    ]);

    // Get statistics by city for deliveries
    const deliveriesByCity = await this.deliveryModel.aggregate([
      {
        $group: {
          _id: {
            city: '$pickupLocation.city',
            region: '$pickupLocation.region',
          },
          totalDeliveries: { $sum: 1 },
          completedDeliveries: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
          },
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          city: '$_id.city',
          region: '$_id.region',
          totalDeliveries: 1,
          completedDeliveries: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { totalDeliveries: -1 } },
    ]);

    return {
      rides: ridesByCity,
      deliveries: deliveriesByCity,
    };
  }

  async getRegionStatsByService(region: string) {
    const [rideStats, deliveryStats] = await Promise.all([
      this.rideModel.aggregate([
        { $match: { 'pickupLocation.region': region } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ['$status', 'PENDING'] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ['$status', 'IN_PROGRESS'] }, 1, 0] },
            },
            totalRevenue: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
            },
          },
        },
      ]),
      this.deliveryModel.aggregate([
        { $match: { 'pickupLocation.region': region } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ['$status', 'PENDING'] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ['$status', 'IN_PROGRESS'] }, 1, 0] },
            },
            totalRevenue: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
            },
          },
        },
      ]),
    ]);

    return {
      region,
      rides: rideStats[0] || {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        totalRevenue: 0,
      },
      deliveries: deliveryStats[0] || {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        totalRevenue: 0,
      },
    };
  }

  async getCityStatsByService(city: string, region?: string) {
    const rideMatch: any = { 'pickupLocation.city': city };
    const deliveryMatch: any = { 'pickupLocation.city': city };

    if (region) {
      rideMatch['pickupLocation.region'] = region;
      deliveryMatch['pickupLocation.region'] = region;
    }

    const [rideStats, deliveryStats] = await Promise.all([
      this.rideModel.aggregate([
        { $match: rideMatch },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ['$status', 'PENDING'] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ['$status', 'IN_PROGRESS'] }, 1, 0] },
            },
            totalRevenue: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
            },
          },
        },
      ]),
      this.deliveryModel.aggregate([
        { $match: deliveryMatch },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ['$status', 'PENDING'] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ['$status', 'IN_PROGRESS'] }, 1, 0] },
            },
            totalRevenue: {
              $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, '$totalPrice', 0] },
            },
          },
        },
      ]),
    ]);

    return {
      city,
      region,
      rides: rideStats[0] || {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        totalRevenue: 0,
      },
      deliveries: deliveryStats[0] || {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        totalRevenue: 0,
      },
    };
  }
}
