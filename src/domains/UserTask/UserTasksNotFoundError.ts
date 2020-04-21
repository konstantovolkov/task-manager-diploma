import { HttpError } from "routing-controllers";

export class UserTasksNotFoundError extends HttpError {

  constructor() {
    super(404, 'Tasks for given user not found');
  }
}