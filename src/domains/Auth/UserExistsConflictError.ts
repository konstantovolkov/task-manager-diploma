import { HttpError } from "routing-controllers";

export class UserExistsConflictError extends HttpError {
  constructor() {
    super(409, 'User with given email address already exists');
  }
}