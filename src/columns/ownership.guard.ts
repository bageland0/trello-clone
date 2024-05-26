import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractOwnershipGuard } from 'src/auth/ownership.guard';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { Repository } from 'typeorm';
import { Column } from 'src/columns/column.entity';
import { ColumnRepository } from './column.repository';

@Injectable()
export class OwnershipGuard extends AbstractOwnershipGuard {
  constructor(
    @Inject(ColumnRepository)
    protected readonly repository: Repository<Column> & OwnershipInterface,
  ) {
    super(repository);
  }
}
