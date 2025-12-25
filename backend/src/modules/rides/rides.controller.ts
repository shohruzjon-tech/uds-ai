import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto, UpdateRideDto } from './dto/ride.dto';
import { OrderStatus, TaxiType } from '../../common/enums';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  create(@Body() createRideDto: CreateRideDto) {
    return this.ridesService.create(createRideDto);
  }

  @Get()
  findAll(@Query('status') status?: OrderStatus) {
    return this.ridesService.findAll(status);
  }

  @Get('available')
  findAvailable(@Query('taxiType') taxiType: TaxiType) {
    return this.ridesService.findAvailable(taxiType);
  }

  @Get('client/:clientId')
  findByClient(@Param('clientId') clientId: string) {
    return this.ridesService.findByClient(clientId);
  }

  @Get('driver/:driverId')
  findByDriver(@Param('driverId') driverId: string) {
    return this.ridesService.findByDriver(driverId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridesService.findOne(id);
  }

  @Patch(':id/accept')
  acceptRide(@Param('id') id: string, @Body('driverId') driverId: string) {
    return this.ridesService.acceptRide(id, driverId);
  }

  @Patch(':id/start')
  startRide(@Param('id') id: string) {
    return this.ridesService.startRide(id);
  }

  @Patch(':id/complete')
  completeRide(@Param('id') id: string) {
    return this.ridesService.completeRide(id);
  }

  @Patch(':id/cancel')
  cancelRide(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.ridesService.cancelRide(id, reason);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.ridesService.update(id, updateRideDto);
  }
}
