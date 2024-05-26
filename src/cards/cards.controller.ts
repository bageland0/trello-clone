import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Card } from './card.entity';
import { UpdateDto } from './dto/update.dto';
import { OwnershipGuard } from './ownership.guard';

@UseGuards(AuthGuard, OwnershipGuard)
@Controller('cards')
export class CardsController {
    constructor(private readonly service: CardsService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() dto: CreateDto) {
        return await this.service.create(dto)
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
