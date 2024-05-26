import { ApiProperty } from '@nestjs/swagger';
import { Column as ColumnEntity } from 'src/columns/column.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty({ type: () => ColumnEntity })
  @OneToMany((type) => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];
}
