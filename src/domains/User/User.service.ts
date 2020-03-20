import { User } from './User.model';
import { getRepository } from 'typeorm';
import { Service } from '../Base/Service';

export class UserService implements Service<User> {
  public async getById(id: number): Promise<User> {
    const user = await getRepository(User).findOne(id);

    if (user) {
      return user;
    }

    throw new Error('User not found');
  }

  public async getList(): Promise<User[]> {
    return await getRepository(User).find();
  }

  public async create(user: User): Promise<User> {
    const newUser = new User();

    const { firstName, lastName, email, userType } = user;
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.userType = userType;

    return await getRepository(User).save(newUser);
  }

  public async update({ id, firstName, lastName, email, userType }: User): Promise<User> {
    const userRepository = getRepository(User);

    const updatedUser = await userRepository.findOne(id);
    if (updatedUser) {
      updatedUser.firstName = firstName;
      updatedUser.lastName = lastName;
      updatedUser.email = email;
      updatedUser.userType = userType;

      return await userRepository.save(updatedUser);
    }

    throw new Error('User not found');
  }

  public async delete(id: number): Promise<void> {
    const userRepository = getRepository(User);
    const user = userRepository.findOne(id);

    if (user) {
      await userRepository.delete(id);
    }

    throw new Error('User not found');
  }
}
