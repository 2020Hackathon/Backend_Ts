import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn, ManyToOne,
} from 'typeorm';
import {Post} from "./Post";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    post_id: number;
}