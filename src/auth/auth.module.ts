import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { OwnershipInterceptor } from './ownership.interceptor';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '9999999h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, OwnershipInterceptor],
  exports: [AuthService, OwnershipInterceptor],
})
export class AuthModule {}
