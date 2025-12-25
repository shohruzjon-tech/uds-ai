import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto, UpdateUserDto, UpdateLocationDto } from './dto/user.dto';
import { UserRole } from '../../common/enums';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll(role?: UserRole): Promise<User[]> {
    const query = role ? { role } : {};
    return this.userModel.find(query).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByPhone(phone: string): Promise<User> {
    return this.userModel.findOne({ phone }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<User> {
    const { latitude, longitude } = updateLocationDto;
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          currentLocation: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
        { new: true },
      )
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async setOnlineStatus(id: string, isOnline: boolean): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { isOnline }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findNearbyDrivers(
    latitude: number,
    longitude: number,
    maxDistance: number = 5000, // meters
    vehicleType?: string,
  ): Promise<User[]> {
    const query: any = {
      role: UserRole.DRIVER,
      isOnline: true,
      isVerified: true,
      currentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance,
        },
      },
    };

    if (vehicleType) {
      query.vehicleType = vehicleType;
    }

    return this.userModel.find(query).exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
