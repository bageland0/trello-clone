import { Card } from 'src/cards/card.entity';
import {
  Column as ColumnOrm,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ColumnOrm()
  text: string;

  @ColumnOrm()
  cardId: number;

  @ManyToOne((type) => Card, (card) => card.comments, { onDelete: "CASCADE"})
  @JoinColumn()
  card: Card;

  //const card = await getRepository(Card).findOne(1, {
  //  relations: ['column', 'column.user'],
  //});
  //
  //const user = card.column.user;
}
