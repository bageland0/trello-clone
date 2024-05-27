import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/cards/card.entity';
import {
  Column as ColumnOrm,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ColumnOrm()
  text: string;

  @ApiProperty()
  @ColumnOrm()
  cardId: number;

  @ApiProperty({ type: () => Card })
  @ManyToOne((type) => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  @JoinColumn()
  card: Card;

}
