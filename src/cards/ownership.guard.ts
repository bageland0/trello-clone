import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractOwnershipGuard } from 'src/auth/ownership.guard';
import { CardRepository } from './card.repository';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { Column } from 'src/columns/column.entity';

@Injectable()
export class OwnershipGuard extends AbstractOwnershipGuard {
  constructor(
    @Inject(CardRepository)
    protected readonly repository: Repository<Card> & OwnershipInterface,
  ) {
    super(repository);
  }
}
