import { User } from './User.model';
import { getRepository} from 'typeorm';
import { Service } from '../Base/Service';
import { UserType } from './UserType';

export class UserService {

  protected get userRepo() {
    return getRepository(User);
  }

  public async getById(id: number) {
    return await this.userRepo.findOne(id);
  }

  public async getList() {
    return await this.userRepo.find();
  }

  public async create(user: User) {
    return await this.userRepo.save(user);
  }

  public async update(id: number, user: User) {
    const oldUser = await this.userRepo.findOne(id);

    if (oldUser) {
      const updatedUser: User = {...oldUser, ...user}
      return await this.userRepo.save(updatedUser)
    }
  }

  public async delete(id: number) {
    const user = await this.getById(id)
    if (user) {
      return await this.userRepo.remove(user);
    }
  }
}
