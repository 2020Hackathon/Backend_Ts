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
import PostRepository from "../repository/PostRepo";

@Entity()
export class Recruitment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @Column()
    title: string;

    @Column()
    description: string;
}

export default Recruitment;
