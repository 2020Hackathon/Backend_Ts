import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import {Likes} from "./Likes";
import Recruitment from "./Recruitment";

export enum postInfo {
    Project = "Project",
    Contest = "Contest",
    Portfolio = "Portfolio",
    SelfIntroduction = "Self-introduction"
}

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    title: number;

    @Column()
    description: string;

    @Column()
    like: number;

    @Column('enum', { enum: postInfo })
    postinfo: string;

    @Column()
    end_date: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column()
    likes: boolean;
}