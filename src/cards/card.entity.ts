import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'src/columns/column.entity';
import { Comment } from 'src/comments/comment.entity';
import {
  Column as ColumnOrm,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cards' })
export class Card {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ColumnOrm()
  name: string;

  @ApiProperty()
  @ColumnOrm()
  columnId: number;

  @ApiProperty({ type: () => Comment })
  @OneToMany(type => Comment, comment => comment.card, {onDelete: "CASCADE"})
  comments: Comment[];

  @ApiProperty({ type: () => Column })
  @ManyToOne((type) => Column, (column) => column.cards, { onDelete: "CASCADE"})
  @JoinColumn()
  column: Column;
}
