import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/cards/card.entity';
import { User } from 'src/users/user.entity';
import {
  Column as ColumnOrm,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'columns' })
export class Column {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ColumnOrm()
  name: string;

  @ApiProperty()
  @ColumnOrm()
  userId: number;

  @ApiProperty({ type: () => Card })
  @OneToMany((type) => Card, (card) => card.column, { onDelete: 'CASCADE' })
  cards: Card[];

  @ApiProperty({ type: () => User })
  @ManyToOne((type) => User, (user) => user.columns)
  @JoinColumn()
  user: User;
}
