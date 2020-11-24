import { getConnection, getRepository } from 'typeorm';
import {Post, postInfo} from '../model/Post';
import UserRepository from "./UserRepo";
import {User} from "../model/User";

class PostRepository {
    public static async findAllByPostinfo(postinfo: string): Promise<Post[]> {
        return await getRepository(Post)
            .createQueryBuilder('post')
            .where('post.postinfo = :postinfo', { postinfo })
            .getMany();
    }

    public static async findByPost_id(id: number): Promise<Post> {
        return await getRepository(Post)
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .orderBy('post.createdAt', 'DESC')
            .getOne()
    }

    public static async findByPost_idAndOrderBylike(id: number): Promise<Post> {
        return await getRepository(Post)
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .orderBy('post.like', 'DESC')
            .getOne()
    }

    public static async likeUpdate(id: number, likes: number): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .update(Post)
            .set({ like: likes })
            .where('id = :id', { id })
            .execute();
    }
}

export default PostRepository;
