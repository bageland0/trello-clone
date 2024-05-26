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
  @PrimaryGeneratedColumn()
  id: number;

  @ColumnOrm()
  name: string;

  @ColumnOrm()
  columnId: number;

  @OneToMany(type => Comment, comment => comment.card, {onDelete: "CASCADE"})
  comments: Comment[];

  @ManyToOne((type) => Column, (column) => column.cards, { onDelete: "CASCADE"})
  @JoinColumn()
  column: Column;
}
