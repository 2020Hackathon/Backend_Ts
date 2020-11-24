import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
  } from 'typeorm';

export enum userInfo{
    Daejeon = "Daejeon",
	Daegu = "Daegu",
	Gwangju = "Gwangju",
	None = "None"
}

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    password: string;

    @Column()
    name: string;
    
    @Column()
    phone_number: string;

    @Column()
    birth: string;

    @Column('enum', { enum: userInfo })
    userinfo: string;

    @Column()
    accessTokenKey: string;

    @Column()
    refreshTokenKey: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}