import { Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { plainToClass } from 'class-transformer';
import { CardRepository } from './card.repository';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { Column } from 'src/columns/column.entity';

@Injectable()
export class CardsService {
  constructor(
    @Inject(CardRepository)
    private repository: Repository<Card> & OwnershipInterface,
  ) {}

  async create(dto: CreateDto): Promise<Card> {
    console.log(dto)

    const model = new Card();
    model.name = dto.name; model.columnId = dto.columnId;

    return await this.repository.save(model);
  }

  async findAll(userId: number): Promise<Card[]> {
    return await this.repository.findAllByUser(userId);
  }

  async findOne(id: number): Promise<Card> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateDto): Promise<Card> {
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
