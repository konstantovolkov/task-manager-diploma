import { HttpError } from "routing-controllers";

export class UnauthorizedUserError extends HttpError {
  constructor() {
    super(401, 'Operation is unauthorized');
  }
}