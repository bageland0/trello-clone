import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Column } from './column.entity';
import { UpdateDto } from './dto/update.dto';
import { OwnershipGuard } from './ownership.guard';

@UseGuards(AuthGuard, OwnershipGuard)
@Controller('columns')
export class ColumnsController {
    constructor(private readonly service: ColumnsService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() dto: CreateDto, @Request() request : Request) {
        return await this.service.create(dto, request)
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
