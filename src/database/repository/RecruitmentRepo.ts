import { getConnection, getRepository } from 'typeorm';
import {Post, postInfo} from '../model/Post';
import UserRepository from "./UserRepo";
import {User} from "../model/User";
import Recruitment from "../model/Recruitment";
import PostRepository from "./PostRepo";

class RecruitmentRepository {
    public static async findByPost_id(id: number): Promise<Recruitment[]> {
        return await getRepository(Recruitment)
            .createQueryBuilder('recruitment')
            .where('recruitment.id = :id', { id })
            .orderBy('recruitment.createdAt', 'DESC')
            .getMany()
    }
}

export default RecruitmentRepository;
