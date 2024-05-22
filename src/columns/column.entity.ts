import { User } from "src/users/user.entity";
import { Column as ColumnOrm, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'columns'})
export class Column {
    @PrimaryGeneratedColumn()
    id: number;

    @ColumnOrm()
    name: string;

    @ColumnOrm()
    user_id: number;

    @ManyToOne(type => User, user => user.columns)
    user: User

}