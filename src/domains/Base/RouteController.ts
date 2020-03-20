import { Router } from 'express';
import { INestedResourcesMap } from './INestedResourcesMap';
import { Service } from './Service';
import { UserService } from '../User/User.service';
import { User } from '../User/User.model';


type TRequestMethod = 'get' | 'post' | 'delete' | 'options' | 'put';

export interface RouteDefinition {
  path: string;
  requestMethod: TRequestMethod
  methodName: string;
}

const methodHelper = (requestMethod: TRequestMethod, path: string) => (target: RouteController<Service<unknown>>,
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
  return methodHelper('get', path);
}

export function Post(path: string) {
  return methodHelper('post', path);
}

export function Put(path: string) {
  return methodHelper('put', path);
}
export function Delete(path: string) {
  return methodHelper('delete', path);
}


export function Controller<T extends { new(...args: any[]): { router: Router } }>(constructor: T) {
  return class extends constructor {
    [index: string]: any;
    constructor(...args: any[]) {
      super(...args);

      const routes = Reflect.getMetadata('routes', constructor) as Array<RouteDefinition>;

      routes.forEach(route => {
        this.router[route.requestMethod](route.path, this.wrapAsync(this[route.methodName].bind(this)));
      })
    }

    private wrapAsync(fn: any) {
      return function (req: any, res: any, next: any) {
        fn(req, res, next).catch(next);
      };
    }
  }
}


export abstract class RouteController<T extends Service<unknown>> {
  public readonly router: Router;
  protected service: T;

  constructor(nestedResoucesMap?: INestedResourcesMap[]) {
    this.router = Router({ mergeParams: true });
    this.init();
    nestedResoucesMap?.forEach(this.setRouterToPath.bind(this));
  }


  private setRouterToPath({ path, routeController }: INestedResourcesMap) {
    this.router.use(path, routeController.router);
  }

  abstract init(): void;
}