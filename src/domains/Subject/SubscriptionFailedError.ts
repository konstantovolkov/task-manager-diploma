import { HttpError } from "routing-controllers";

export class SubscriptionFailedError extends HttpError {

  constructor() {
    super(404, 'Subject or user to subscribe not found');
  }
}