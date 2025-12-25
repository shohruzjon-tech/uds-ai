import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class PricingService {
  constructor(private aiService: AiService) {}

  async calculatePrice(
    distance: number,
    duration: number,
    taxiType: string,
    carCategory?: string,
  ): Promise<number> {
    return this.aiService.suggestPrice(distance, duration, taxiType, carCategory);
  }

  async calculateDeliveryPrice(
    distance: number,
    weight: number,
    pricePerKg?: number,
  ): Promise<number> {
    const basePricePerKg = pricePerKg || 1000;
    const distancePrice = distance * 1500;
    const weightPrice = weight * basePricePerKg;
    return distancePrice + weightPrice;
  }
}
