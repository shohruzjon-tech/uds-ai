import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  private expo: Expo;

  constructor(private configService: ConfigService) {
    this.expo = new Expo({
      accessToken: this.configService.get<string>('EXPO_ACCESS_TOKEN'),
    });
  }

  async sendPushNotification(
    expoPushToken: string,
    title: string,
    body: string,
    data?: any,
  ): Promise<void> {
    if (!Expo.isExpoPushToken(expoPushToken)) {
      console.error(`Invalid Expo push token: ${expoPushToken}`);
      return;
    }

    const message: ExpoPushMessage = {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
      data,
    };

    try {
      const chunks = this.expo.chunkPushNotifications([message]);
      for (const chunk of chunks) {
        await this.expo.sendPushNotificationsAsync(chunk);
      }
    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  }

  async sendOrderNotification(
    expoPushToken: string,
    orderType: string,
    status: string,
  ): Promise<void> {
    const title = `${orderType} Order Update`;
    const body = `Your order status: ${status}`;
    await this.sendPushNotification(expoPushToken, title, body, {
      orderType,
      status,
    });
  }
}
