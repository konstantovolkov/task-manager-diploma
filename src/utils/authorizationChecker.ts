import { Action } from "routing-controllers";
import { UserType } from "../domains/User/UserType";
import { getRepository } from "typeorm";
import { User } from "../domains/User/User.model";
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export async function authorizationChecker(action: Action, roles: UserType[]): Promise<boolean> {
  const authHeader = (action.request as Request).headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    
    const verifiedToken: any = jwt.verify(token, 'secret key', {
      complete: true
    })

    const user = await getRepository(User).findOne(verifiedToken.payload.sub);
    if (user && !roles.length) {
      return true;
    }

    if (user && roles.find(role => user.userType === role)) {
      return true;
    }
  }

  return false;
}