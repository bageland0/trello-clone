import { Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { plainToClass } from 'class-transformer';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { Column } from 'src/columns/column.entity';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(CommentRepository)
    private repository: Repository<Comment> & OwnershipInterface,
  ) {}

  async create(dto: CreateDto): Promise<Comment> {
    console.log(dto);

    const model = new Comment();
    model.text = dto.text;
    model.cardId = dto.cardId;

    return await this.repository.save(model);
  }

  async findAll(userId: number): Promise<Comment[]> {
    return await this.repository.findAllByUser(userId);
  }

  async findOne(id: number): Promise<Comment> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateDto): Promise<Comment> {
    const model = await this.repository.findOneBy({ id });
    if (!model) {
      throw new NotFoundException();
    }

    Object.assign(model, dto);

    return await this.repository.save(model);
  }

  async delete(id: number): Promise<void> {
    const model = await this.repository.findOneBy({ id });
    if (!model) {
      throw new NotFoundException();
    }

    await this.repository.delete(model);

    return;
  }
}
