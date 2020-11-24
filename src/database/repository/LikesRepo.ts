import { getConnection, getRepository } from 'typeorm';
import {Likes} from "../model/Likes";

class LikesRepository {
    public static async findAllByUser_idAndPost_id(user_id: string, post_id: number): Promise<Likes> {
        return await getRepository(Likes)
            .createQueryBuilder('likes')
            .where('likes.user_id = :user_id', { user_id })
            .where('likes.post_id = :post_id', { post_id })
            .getOne();
    }

    public static async createLike(
        user_id: string,
        post_id: number
    ): Promise<void> {
        const likes = new Likes();
        likes.user_id = user_id;
        likes.post_id = post_id;
        await getRepository(Likes).save(likes);
    }

    public static async deleteLike(
        user_id: string,
        post_id: number
    ) {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Likes)
            .where('user_id = :user_id', { user_id })
            .where('post_id = :post_id', { post_id })
            .execute();
    }
}

export default LikesRepository;
