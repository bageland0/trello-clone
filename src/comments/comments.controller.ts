import {
  Body, Controller,
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
import { AuthGuard } from 'src/auth/auth.guard';
import { OwnershipGuard } from './ownership.guard';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentCreateDto } from './dto/create.dto';
import { CommentUpdateDto } from './dto/update.dto';

@ApiTags('comments')
@UseGuards(AuthGuard, OwnershipGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create comment' })
  @ApiBody({ type: CommentCreateDto })
  @HttpCode(201)
  async create(@Body() dto: CommentCreateDto) {
    return await this.service.create(dto);
  }

  @ApiOperation({summary: 'Find all comments'})
  @Get()
  async findAll(@Req() request) {
    const userId = request.user.id;
    return await this.service.findAll(userId);
  }

  @ApiOperation({summary: 'Find comment'})
  @ApiParam({name: "id", required: true, type: Number})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.service.findOne(+id);
  }

  @ApiOperation({summary: 'Update comment'})
  @ApiBody({type: CommentUpdateDto})
  @ApiParam({name: "id", required: true, type: Number})
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() dto: CommentUpdateDto) {
    return await this.service.update(+id, dto);
  }

  @ApiOperation({summary: 'Delete comment'})
  @ApiParam({name: "id", required: true, type: Number})
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.service.delete(+id);
  }
}
