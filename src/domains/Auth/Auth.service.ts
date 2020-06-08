import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../User/User.model";
import { UserCredentials } from "./UserCredentials.model";
import * as jwt from 'jsonwebtoken';

@Service()
export class AuthService {
  protected get userRepo() {
    return getRepository(User);
  }
  
  protected get credentialsRepo() {
    return getRepository(UserCredentials);
  }
  
  private generateTokenForUser(user: User): string {
    const tokenPayload = {
      sub: user.id,
      name: `${user.firstName}  ${user.lastName}`,
      role: user.userType
    }
    
    return jwt.sign(tokenPayload, 'secret key')
  }

  private async findCredentialsByEmail(email: string) {
    return await this.credentialsRepo.findOne({ email }, { relations: ['user'] })
  }
  
  async getTokenForUserCredentials(credentials: UserCredentials) {
    const { email: sentEmail, password: sentPassword } = credentials;
    
    const foundCredentials = await this.findCredentialsByEmail(sentEmail);
    
    if (foundCredentials) {
      const { email, password, user } = foundCredentials;
      
      if (email === sentEmail && password === sentPassword) {
        return this.generateTokenForUser(user);
      }
    }
  }

  async signUp(user: User) {
    const credentials = await this.findCredentialsByEmail(user.credentials.email)
    
    if (!credentials) {
      const newUser = await this.userRepo.save(user);

      return this.generateTokenForUser(newUser)
    }
  }
}