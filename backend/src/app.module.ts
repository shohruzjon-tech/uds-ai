import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RidesModule } from './modules/rides/rides.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { LocationsModule } from './modules/locations/locations.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { ConfigurationModule } from './modules/config/configuration.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RidesModule,
    DeliveriesModule,
    VehiclesModule,
    WalletModule,
    PaymentsModule,
    PricingModule,
    NotificationsModule,
    WebsocketModule,
    LocationsModule,
    StatisticsModule,
    ConfigurationModule,
    AiModule,
  ],
})
export class AppModule {}
