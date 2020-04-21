import { HttpError } from "routing-controllers";

export class UserTaskNotFoundError extends HttpError {

  constructor() {
    super(404, 'User task not found');
  }
}