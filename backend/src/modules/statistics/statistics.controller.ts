import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.statisticsService.getDashboardStats();
  }

  @Get('driver/:driverId')
  getDriverStats(@Param('driverId') driverId: string) {
    return this.statisticsService.getDriverStats(driverId);
  }

  @Get('regional')
  getRegionalStats() {
    return this.statisticsService.getRegionalStats();
  }

  @Get('city')
  getCityStats() {
    return this.statisticsService.getCityStats();
  }

  @Get('region/:region')
  getRegionStatsByService(@Param('region') region: string) {
    return this.statisticsService.getRegionStatsByService(region);
  }

  @Get('city/:city')
  getCityStatsByService(
    @Param('city') city: string,
    @Query('region') region?: string,
  ) {
    return this.statisticsService.getCityStatsByService(city, region);
  }
}
