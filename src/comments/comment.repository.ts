import { DataSource, Repository } from 'typeorm';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { User } from 'src/users/user.entity';
import { Column } from 'src/columns/column.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { Card } from 'src/cards/card.entity';

export const CommentRepository = (
  dataSource: DataSource,
): Repository<Comment> & OwnershipInterface => {
  const repository = dataSource.getRepository(Comment);
  const cardRepository = dataSource.getRepository(Card);
  const extendedRepository = repository.extend({
    async getOwner(id: number): Promise<User> {
      const model = await this.findOne({
        where: { id: id },
        relations: ['card', 'card.column', 'card.column.user'],
      });
      if (!model) {
        throw new NotFoundException();
      }
      return model.card.column.user;
    },
    async getParent(params: any): Promise<Column> {
      const cardId = Number(params.cardId);
      const model = await cardRepository.findOne({
        where: { id: cardId },
        relations: ['column'],
      });
      if (!model) {
        throw new NotFoundException();
      }
      return model.column;
    },
    async findAllByUser(userId: number): Promise<Comment[]> {
      const models = await this.find({
        relations: ['card', 'card.column'],
        where: {
          card: {
            column: {
              userId: userId,
            },
          },
        },
      });
      return models;
    },
  });

  return extendedRepository;
};
