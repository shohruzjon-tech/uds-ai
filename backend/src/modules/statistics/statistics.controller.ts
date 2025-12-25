import { Controller, Get, Param } from '@nestjs/common';
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
}
