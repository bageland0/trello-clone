import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateDto } from './dto/update.dto';
import { OwnershipGuard } from './ownership.guard';

@UseGuards(AuthGuard, OwnershipGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll(@Req() request) {
    const userId = request.user.id;
    return await this.service.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.service.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateDto) {
    return await this.service.update(+id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.service.delete(+id);
  }
}
