import { DataSource, Repository } from 'typeorm';
import { Card } from './card.entity';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { User } from 'src/users/user.entity';
import { Column } from 'src/columns/column.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

export const CardRepository = (
  dataSource: DataSource,
): Repository<Card> & OwnershipInterface => {
  const repository = dataSource.getRepository(Card);
  const columnRepository = dataSource.getRepository(Column); 
  const extendedRepository = repository.extend({
    async getOwner(id: number): Promise<User> {
      const model = await this.findOne({
        where: { id: id },
        relations: ['column', 'column.user'],
      });
      if (!model) {
        throw new NotFoundException();
      }
      return model.column.user;
    },
    async getParent(params: any): Promise<Column> {
      console.log(params);
      const model = await columnRepository.findOne({
        where: { id: params.columnId },
      });
      if (!model) {
        throw new NotFoundException();
      }
      return model;
    },
    async findAllByUser(userId: number): Promise<Card[]> {
      const models = await this.find({
        relations: ['column'],
        where: {
          column: {
            userId: userId,
          },
        },
      });
      return models;
    },
  });
  //extendedRepository.getOwner(1).then((user)=> {
  //  console.log(user);
  //});

  return extendedRepository;
};
