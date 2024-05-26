import { Column } from 'src/columns/column.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

export interface OwnershipInterface {
  getOwner(id: number): Promise<User>;
  getParent(params: any): Promise<Column>;
  findAllByUser(params: any): Promise<Array<any>>;
}
