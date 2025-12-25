import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration, AppVersion } from './configuration.schema';
import { Platform, AppType } from '../../common/enums';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectModel(Configuration.name)
    private configModel: Model<Configuration>,
    @InjectModel(AppVersion.name)
    private appVersionModel: Model<AppVersion>,
  ) {}

  async getConfig(key: string): Promise<any> {
    const config = await this.configModel.findOne({ key }).exec();
    return config?.value;
  }

  async setConfig(key: string, value: any, description?: string): Promise<Configuration> {
    return this.configModel
      .findOneAndUpdate(
        { key },
        { value, description },
        { upsert: true, new: true },
      )
      .exec();
  }

  async getAppVersion(platform: Platform, appType: AppType): Promise<AppVersion> {
    return this.appVersionModel
      .findOne({ platform, appType, isActive: true })
      .sort({ buildNumber: -1 })
      .exec();
  }

  async createAppVersion(
    platform: Platform,
    appType: AppType,
    version: string,
    buildNumber: number,
    forceUpdate: boolean = false,
    releaseNotes?: string,
  ): Promise<AppVersion> {
    return this.appVersionModel.create({
      platform,
      appType,
      version,
      buildNumber,
      forceUpdate,
      releaseNotes,
    });
  }
}
