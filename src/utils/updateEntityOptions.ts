import { BodyOptions } from "routing-controllers";

export const updateEntityOptions: BodyOptions = {
  validate: {
    skipMissingProperties: true
  }
}