import { Controller, Get, Query } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('geocode')
  async geocode(@Query('address') address: string) {
    return this.mapsService.geocode(address);
  }

  @Get('reverse-geocode')
  async reverseGeocode(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return this.mapsService.reverseGeocode(latitude, longitude);
  }

  @Get('suggest')
  async getSuggestions(
    @Query('text') text: string,
    @Query('ll') ll?: string,
    @Query('spn') spn?: string,
  ) {
    const bounds = ll && spn ? { ll, spn } : undefined;
    return this.mapsService.getSuggestions(text, bounds);
  }

  @Get('route')
  async calculateRoute(
    @Query('fromLat') fromLat: number,
    @Query('fromLng') fromLng: number,
    @Query('toLat') toLat: number,
    @Query('toLng') toLng: number,
    @Query('mode') mode: 'auto' | 'pedestrian' | 'bicycle' = 'auto',
  ) {
    return this.mapsService.calculateRoute(
      { latitude: fromLat, longitude: fromLng },
      { latitude: toLat, longitude: toLng },
      mode,
    );
  }
}
