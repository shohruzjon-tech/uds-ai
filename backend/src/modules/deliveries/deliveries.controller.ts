import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  create(@Body() createDeliveryDto: any) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(id);
  }

  @Post('calculate-payload')
  calculatePayload(@Body() body: any) {
    return this.deliveriesService.calculatePayload(
      body.weight,
      body.length,
      body.width,
      body.height,
    );
  }
}
