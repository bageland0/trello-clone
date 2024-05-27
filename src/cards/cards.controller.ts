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
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Card } from './card.entity';
import { OwnershipGuard } from './ownership.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CardCreateDto } from './dto/create.dto';
import { CardUpdateDto } from './dto/update.dto';

@ApiTags('cards')
@ApiBearerAuth()
@UseGuards(AuthGuard, OwnershipGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly service: CardsService) {}

  @ApiOperation({ summary: 'Create card' })
  @ApiBody({ type: CardCreateDto })
  @ApiCreatedResponse({ description: 'Card has been successfully created'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Column not found'})
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CardCreateDto) {
    return await this.service.create(dto);
  }

  @ApiOperation({ summary: 'Find all cards' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @Get()
  async findAll(@Req() request) {
    const userId = request.user.id;
    return await this.service.findAll(userId);
  }

  @ApiOperation({ summary: 'Find card' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiNotFoundResponse({ description: 'Not found'})
  @ApiParam({ name: 'id', required: true, type: Number })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.service.findOne(+id);
  }

  @ApiOperation({ summary: 'Update card' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiNotFoundResponse({ description: 'Not found'})
  @ApiBody({ type: CardUpdateDto })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: CardUpdateDto,
  ) {
    return await this.service.update(+id, dto);
  }

  @ApiOperation({ summary: 'Delete card' })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiNotFoundResponse({ description: 'Not found'})
  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.service.delete(+id);
  }
}
