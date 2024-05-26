import { Card } from "src/cards/card.entity";
import { User } from "src/users/user.entity";
import { Column as ColumnOrm, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'columns'})
export class Column {
    @PrimaryGeneratedColumn()
    id: number;

    @ColumnOrm()
    name: string;

    @ColumnOrm()
    userId: number

    @OneToMany(type => Card, card => card.column, {onDelete: "CASCADE"})
    cards: Card[];

    @ManyToOne(type => User, user => user.columns)
    @JoinColumn()
    user: User

}