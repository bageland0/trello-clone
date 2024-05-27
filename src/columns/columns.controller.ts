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
import { ColumnsService } from './columns.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ColumnUpdateDto } from './dto/update.dto';
import { OwnershipGuard } from './ownership.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ColumnCreateDto } from './dto/create.dto';

@ApiTags('columns')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly service: ColumnsService) {}

  @ApiOperation({ summary: 'Create column' })
  @ApiBody({ type: ColumnCreateDto })
  @ApiCreatedResponse({ description: 'Column has been successfully created'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @Post()
  @HttpCode(201)
  async create(@Body() dto: ColumnCreateDto, @Request() request: Request) {
    return await this.service.create(dto, request);
  }

  @ApiOperation({ summary: 'Find all columns' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @UseGuards(OwnershipGuard)
  @Get()
  async findAll(@Req() request) {
    const userId = request.user.id;
    return await this.service.findAll(userId);
  }

  @ApiOperation({ summary: 'Find column' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiNotFoundResponse({ description: 'Not found'})
  @ApiParam({ name: 'id', required: true, type: Number })
  @UseGuards(OwnershipGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.service.findOne(+id);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiNotFoundResponse({ description: 'Not found'})
  @ApiBody({ type: ColumnUpdateDto })
  @ApiParam({ name: 'id', required: true, type: Number })
  @UseGuards(OwnershipGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: ColumnUpdateDto,
  ) {
    return await this.service.update(+id, dto);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  @ApiNotFoundResponse({ description: 'Not found'})
  @ApiParam({ name: 'id', required: true, type: Number })
  @UseGuards(OwnershipGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.service.delete(+id);
  }
}
