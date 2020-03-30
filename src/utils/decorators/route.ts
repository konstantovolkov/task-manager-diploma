import { TRequestMethod } from "../../types/RequestMethod";
import { RouteController } from "../../domains/Base/RouteController";
import { Service } from "../../domains/Base/Service";
import { RouteDefinition } from "../../types/RouteDefinition";

const getMethodDecorator = (requestMethod: TRequestMethod, path: string) => (target: RouteController<Service<unknown>>,
  propertyKey: string, descriptor: any) => {

  if (!Reflect.hasMetadata('routes', target.constructor)) {
    Reflect.defineMetadata('routes', [], target.constructor);
  }

  const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

  routes.push({
    requestMethod,
    path,
    methodName: propertyKey
  });

  Reflect.defineMetadata('routes', routes, target.constructor);
}

export function Get(path: string) {
  return getMethodDecorator('get', path);
}

export function Post(path: string) {
  return getMethodDecorator('post', path);
}

export function Put(path: string) {
  return getMethodDecorator('put', path);
}
export function Delete(path: string) {
  return getMethodDecorator('delete', path);
}