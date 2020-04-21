import { HttpError } from "routing-controllers";

export class SubjectNotFoundError extends HttpError {

  constructor() {
    super(404, 'Subject not found');
  }
}