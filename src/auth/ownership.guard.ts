import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { OwnershipInterface } from './ownership.interface';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractOwnershipGuard implements CanActivate {
  constructor(
    protected readonly repository: Repository<any> & OwnershipInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;
    const body = request.body;

    if (request.method === 'GET' && Object.keys(params).length === 0) {
      return true;
    }

    if (
      request.method === 'GET' ||
      request.method === 'PATCH' ||
      request.method === 'DELETE'
    ) {
      const owner = await this.repository.getOwner(params.id);

      if (owner.id === user.id) {
        return true;
      } else {
        throw new ForbiddenException();
      }
    }

    const owner = await this.repository.getParent(body);

    if (owner.userId === user.id) {
      return true;
    } else {
      throw new ForbiddenException();
    }
  }
}
