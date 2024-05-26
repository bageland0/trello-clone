import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DataSource, Repository } from 'typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: CommentRepository,
      useFactory: (dataSource: DataSource) => CommentRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule],
})
export class CommentsModule {}
