import { createParamDecorator } from "routing-controllers";
import { getIntParam } from "../getIntParam";

export function IntParam(name: string) {
  return createParamDecorator({
    required: true,
    value: action => getIntParam(action.request.params[name])
  })
} 