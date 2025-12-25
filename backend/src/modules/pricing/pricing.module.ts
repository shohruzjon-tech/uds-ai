import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
