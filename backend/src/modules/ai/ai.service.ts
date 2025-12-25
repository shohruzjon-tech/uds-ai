import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async suggestPrice(
    distance: number,
    duration: number,
    taxiType: string,
    carCategory?: string,
  ): Promise<number> {
    try {
      const prompt = `Calculate optimal taxi price in Uzbekistan (UZS) for:
      Distance: ${distance}km
      Duration: ${duration} minutes
      Type: ${taxiType}
      Category: ${carCategory || 'Standard'}
      
      Consider Uzbekistan market rates. Provide only the numeric price value.`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
      });

      const price = parseFloat(response.choices[0].message.content.trim());
      return isNaN(price) ? this.fallbackPricing(distance, duration) : price;
    } catch (error) {
      console.error('AI pricing failed:', error.message);
      return this.fallbackPricing(distance, duration);
    }
  }

  private fallbackPricing(distance: number, duration: number): number {
    const basePrice = 5000;
    const pricePerKm = 2000;
    const pricePerMinute = 500;
    return basePrice + distance * pricePerKm + duration * pricePerMinute;
  }

  async matchDriver(orderDetails: any, availableDrivers: any[]): Promise<any> {
    // AI-powered driver matching logic
    if (availableDrivers.length === 0) return null;
    
    // Simple proximity-based matching for now
    return availableDrivers[0];
  }
}
