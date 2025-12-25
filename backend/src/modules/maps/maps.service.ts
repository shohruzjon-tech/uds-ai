import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MapsService {
  private readonly apiKey: string;
  private readonly geocodeUrl = 'https://geocode-maps.yandex.ru/1.x/';
  private readonly suggestUrl = 'https://suggest-maps.yandex.ru/v1/suggest';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('YANDEX_MAPS_API_KEY');
  }

  /**
   * Geocode address to coordinates using Yandex Maps API
   */
  async geocode(address: string) {
    try {
      const response = await axios.get(this.geocodeUrl, {
        params: {
          apikey: this.apiKey,
          geocode: address,
          format: 'json',
          results: 1,
        },
      });

      const result =
        response.data.response.GeoObjectCollection.featureMember[0];
      if (!result) {
        return null;
      }

      const geoObject = result.GeoObject;
      const [longitude, latitude] = geoObject.Point.pos.split(' ').map(Number);

      return {
        address: geoObject.metaDataProperty.GeocoderMetaData.text,
        coordinates: {
          latitude,
          longitude,
        },
        city: this.extractCity(geoObject),
        region: this.extractRegion(geoObject),
      };
    } catch (error) {
      console.error('Yandex Maps geocode error:', error.message);
      return null;
    }
  }

  /**
   * Reverse geocode coordinates to address using Yandex Maps API
   */
  async reverseGeocode(latitude: number, longitude: number) {
    try {
      const response = await axios.get(this.geocodeUrl, {
        params: {
          apikey: this.apiKey,
          geocode: `${longitude},${latitude}`,
          format: 'json',
          results: 1,
        },
      });

      const result =
        response.data.response.GeoObjectCollection.featureMember[0];
      if (!result) {
        return null;
      }

      const geoObject = result.GeoObject;

      return {
        address: geoObject.metaDataProperty.GeocoderMetaData.text,
        city: this.extractCity(geoObject),
        region: this.extractRegion(geoObject),
        street: this.extractStreet(geoObject),
      };
    } catch (error) {
      console.error('Yandex Maps reverse geocode error:', error.message);
      return null;
    }
  }

  /**
   * Get location suggestions using Yandex Maps Suggest API
   */
  async getSuggestions(text: string, bounds?: {
    ll: string; // longitude,latitude
    spn: string; // longitude_span,latitude_span
  }) {
    try {
      const params: any = {
        apikey: this.apiKey,
        text,
        results: 10,
        lang: 'uz_UZ', // Uzbek language
      };

      if (bounds) {
        params.ll = bounds.ll;
        params.spn = bounds.spn;
      }

      const response = await axios.get(this.suggestUrl, { params });

      return response.data.results.map((item: any) => ({
        title: item.title.text,
        subtitle: item.subtitle?.text || '',
        uri: item.uri,
        distance: item.distance?.value,
      }));
    } catch (error) {
      console.error('Yandex Maps suggest error:', error.message);
      return [];
    }
  }

  /**
   * Calculate route between two points using Yandex Maps Router API
   */
  async calculateRoute(
    from: { latitude: number; longitude: number },
    to: { latitude: number; longitude: number },
    mode: 'auto' | 'pedestrian' | 'bicycle' = 'auto',
  ) {
    try {
      const response = await axios.get(
        'https://api.routing.yandex.net/v2/route',
        {
          params: {
            apikey: this.apiKey,
            waypoints: `${from.longitude},${from.latitude}|${to.longitude},${to.latitude}`,
            mode,
          },
        },
      );

      const route = response.data.route;
      if (!route) {
        return null;
      }

      return {
        distance: route.distance.value, // meters
        duration: route.duration.value, // seconds
        geometry: route.legs[0].steps.map((step: any) => ({
          distance: step.distance.value,
          duration: step.duration.value,
          polyline: step.polyline,
        })),
      };
    } catch (error) {
      console.error('Yandex Maps route error:', error.message);
      return null;
    }
  }

  /**
   * Extract city from Yandex geocode response
   */
  private extractCity(geoObject: any): string {
    const components =
      geoObject.metaDataProperty.GeocoderMetaData.Address.Components;
    const city = components.find(
      (c: any) => c.kind === 'locality' || c.kind === 'province',
    );
    return city?.name || '';
  }

  /**
   * Extract region from Yandex geocode response
   */
  private extractRegion(geoObject: any): string {
    const components =
      geoObject.metaDataProperty.GeocoderMetaData.Address.Components;
    const region = components.find((c: any) => c.kind === 'province');
    return region?.name || '';
  }

  /**
   * Extract street from Yandex geocode response
   */
  private extractStreet(geoObject: any): string {
    const components =
      geoObject.metaDataProperty.GeocoderMetaData.Address.Components;
    const street = components.find((c: any) => c.kind === 'street');
    return street?.name || '';
  }
}
