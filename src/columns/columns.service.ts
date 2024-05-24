import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Column } from './column.entity';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private repository: Repository<Column>,
  ) {}

  async create(dto: CreateDto, request: Request): Promise<Column> {
    const clearDto = plainToClass(UpdateDto, dto, {
      excludeExtraneousValues: true,
    });

    const model = new Column();
    model.name = clearDto.name;
    model.user = request['user'];

    return await this.repository.save(model);
  }

  async findAll(): Promise<Column[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Column> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateDto): Promise<Column> {
    const clearDto = plainToClass(UpdateDto, dto, {
      excludeExtraneousValues: true,
    });

    const model = await this.repository.findOneBy({ id });
    if (!model) {
      throw new NotFoundException();
    }

    Object.assign(clearDto, dto);

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
