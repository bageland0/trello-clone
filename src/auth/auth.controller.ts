import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login user with email and password to get JWT-token',
  })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  //@UseGuards(AuthGuard)
  //@Get('profile')
  //getProfile(@Request() req) {
  //  console.log(req)
  //  return req.user;
  //}
}
