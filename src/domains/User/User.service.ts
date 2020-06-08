import { User } from './User.model';
import { getRepository} from 'typeorm';
import { Service } from 'typedi';

@Service()
export class UserService {

  protected get userRepo() {
    return getRepository(User);
  }

  async getById(id: number) {
    return await this.userRepo.findOne(id);
  }

  async getList() {
    return await this.userRepo.find();
  }

  async update(id: number, user: User) {
    const oldUser = await this.userRepo.findOne(id);

    if (oldUser) {
      const updatedUser: User = {...oldUser, ...user}
      return await this.userRepo.save(updatedUser)
    }
  }

  async delete(id: number) {
    const user = await this.getById(id)
    if (user) {
      return await this.userRepo.remove(user);
    }
  }
}
