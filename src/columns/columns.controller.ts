import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Column } from './column.entity';
import { OwnershipInterceptor } from 'src/auth/ownership.interceptor';
import { UpdateDto } from './dto/update.dto';

@UseGuards(AuthGuard)
@UseInterceptors(OwnershipInterceptor)
@Controller('columns')
export class ColumnsController {
    constructor(private readonly service: ColumnsService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() dto: CreateDto, @Request() request : Request) {
        return await this.service.create(dto, request)
    }

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: string) {
        return await this.service.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateDto) {
        console.log('update')
        return await this.service.update(+id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: string) {
        console.log('update')
        return await this.service.delete(+id);
    }

}
