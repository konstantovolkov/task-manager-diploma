import { TRequestMethod } from "./RequestMethod";

export interface RouteDefinition {
  path: string;
  requestMethod: TRequestMethod
  methodName: string;
}