import { DataSource, Repository } from 'typeorm';
import { OwnershipInterface } from 'src/auth/ownership.interface';
import { User } from 'src/users/user.entity';
import { Column } from 'src/columns/column.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

export const ColumnRepository = (
  dataSource: DataSource,
): Repository<Column> & OwnershipInterface => {
  const repository = dataSource.getRepository(Column);
  const extendedRepository = repository.extend({
    async getOwner(id: number): Promise<User> {
      const model = await this.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (!model) {
        throw new NotFoundException();
      }
      return model.user;
    },
    async getParent(params: any): Promise<Column> {

      const model = await this.findOne({
        where: { id: params.columnId },
      });
      if (!model) {
        throw new NotFoundException();
      }
      return model;
    },
    async findAllByUser(userId: number): Promise<Column[]> {
      const models = await this.find({
        where: {
          userId: userId,
        },
      });
      return models;
    },
  });

  return extendedRepository;
};
