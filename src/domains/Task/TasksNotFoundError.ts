import { HttpError } from "routing-controllers";

export class TasksNotFoundError extends HttpError {

  constructor() {
    super(404, 'Tasks of given subject not found');
  }
}