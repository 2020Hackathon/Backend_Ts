import { getConnection, getRepository } from 'typeorm';
import { User } from '../model/User';

class UserRepository {
    public static async findById(id: string): Promise<User> {
        return await getRepository(User)
          .createQueryBuilder('user')
          .where('user.id = :id', { id })
          .getOne();
    }

    public static async createUser(
        name: string,
        id: string,
        password: string,
        userinfo: string
    ): Promise<User> {
        const user = new User();
        user.name = name;
        user.id = id;
        user.password = password;
        user.userinfo = userinfo;
        return await getRepository(User).save(user);
    }

    public static async UserKeyUpdate(
        id: string,
        firstKey: string,
        secondKey: string,
      ): Promise<void> {
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({
            accessTokenKey: firstKey,
            refreshTokenKey: secondKey,
          })
          .where('id = :id', { id })
          .execute();
      }
}

export default UserRepository;
