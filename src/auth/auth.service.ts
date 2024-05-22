import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(name);
    const match = await bcrypt.compare(pass, user?.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {sub: user.id, name: user.name}

    return {
        access_token: await this.jwtService.signAsync(payload)
    }
  }

}
