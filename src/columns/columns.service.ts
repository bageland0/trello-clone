import { Inject, Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Column } from './column.entity';
import { plainToClass } from 'class-transformer';
import { ColumnRepository } from './column.repository';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { ColumnCreateDto } from './dto/create.dto';
import { ColumnUpdateDto } from './dto/update.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @Inject(ColumnRepository)
    private repository: Repository<Column> & OwnershipInterface,
  ) {}

  async create(dto: ColumnCreateDto, request: Request): Promise<Column> {
    const model = new Column();
    model.name = dto.name;
    model.user = request['user'];

    return await this.repository.save(model);
  }

  async findAll(userId: number): Promise<Column[]> {
    return await this.repository.findAllByUser(userId);
  }

  async findOne(id: number): Promise<Column> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, dto: ColumnUpdateDto): Promise<Column> {
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
