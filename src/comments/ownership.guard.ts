import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractOwnershipGuard } from 'src/auth/ownership.guard';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { Repository } from 'typeorm';
import { Column } from 'src/columns/column.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class OwnershipGuard extends AbstractOwnershipGuard {
  constructor(
    @Inject(CommentRepository)
    protected readonly repository: Repository<Comment> & OwnershipInterface,
  ) {
    super(repository);
  }
}
