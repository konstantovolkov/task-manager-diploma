import { BodyOptions } from "routing-controllers";
import { ValidatorOptions } from "class-validator";

export const updateEntityOptions: BodyOptions = {
  validate: {
    skipMissingProperties: true
  }
}