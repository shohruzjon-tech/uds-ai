import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { Platform, AppType } from '../../common/enums';

@Controller('config')
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationService) {}

  @Get()
  getConfig(@Query('key') key: string) {
    return this.configService.getConfig(key);
  }

  @Post()
  setConfig(@Body() body: { key: string; value: any; description?: string }) {
    return this.configService.setConfig(body.key, body.value, body.description);
  }

  @Get('version')
  getAppVersion(
    @Query('platform') platform: Platform,
    @Query('appType') appType: AppType,
  ) {
    return this.configService.getAppVersion(platform, appType);
  }

  @Post('version')
  createAppVersion(@Body() body: any) {
    return this.configService.createAppVersion(
      body.platform,
      body.appType,
      body.version,
      body.buildNumber,
      body.forceUpdate,
      body.releaseNotes,
    );
  }
}
