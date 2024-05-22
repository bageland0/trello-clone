import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  //getDbPassword(): string {
  //  return this.configService.get('DATABASE_PASSWORD')
  //}
  //getDbUser(): string {
  //  return this.configService.get('DATABASE_USER')
  //}
  //getDb(): string {
  //  return this.configService.get('DATABASE')
  //}
}
