import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Otp } from './otp.schema';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private eskizToken: string;

  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.authenticateEskiz();
  }

  private async authenticateEskiz() {
    try {
      const response = await axios.post(
        `${this.configService.get('ESKIZ_API_URL')}/auth/login`,
        {
          email: this.configService.get('ESKIZ_EMAIL'),
          password: this.configService.get('ESKIZ_PASSWORD'),
        },
      );
      this.eskizToken = response.data.data.token;
    } catch (error) {
      console.error('Failed to authenticate with Eskiz.uz:', error.message);
    }
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { phone } = sendOtpDto;
    
    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Calculate expiration (5 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Save OTP to database
    await this.otpModel.create({
      phone,
      code,
      expiresAt,
    });

    // Send SMS via Eskiz.uz
    try {
      await axios.post(
        `${this.configService.get('ESKIZ_API_URL')}/message/sms/send`,
        {
          mobile_phone: phone,
          message: `UDS GO verification code: ${code}`,
          from: '4546',
        },
        {
          headers: {
            Authorization: `Bearer ${this.eskizToken}`,
          },
        },
      );
    } catch (error) {
      console.error('Failed to send SMS:', error.message);
      // In development, you might want to return the code
      if (this.configService.get('NODE_ENV') === 'development') {
        return { message: 'OTP sent (dev mode)', code };
      }
    }

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phone, code } = verifyOtpDto;

    const otp = await this.otpModel
      .findOne({
        phone,
        code,
        verified: false,
        expiresAt: { $gt: new Date() },
      })
      .exec();

    if (!otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Mark OTP as verified
    otp.verified = true;
    await otp.save();

    // Generate JWT token
    const payload = { phone };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      message: 'OTP verified successfully',
    };
  }

  async refreshToken(userId: string) {
    const payload = { sub: userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
