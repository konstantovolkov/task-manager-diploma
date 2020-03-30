import { Router } from "express";
import { RouteDefinition } from "../../types/RouteDefinition";

export function Controller<T extends { new(...args: any[]): { router: Router } }>(constructor: T) {
  return class extends constructor {
    [index: string]: any;
    constructor(...args: any[]) {
      super(...args);

      const routes = Reflect.getMetadata('routes', constructor) as Array<RouteDefinition>;

      routes.forEach(route => {
        this.router[route.requestMethod](route.path, this.wrapRouteHandler(this[route.methodName].bind(this)));
      })
    }

    private wrapRouteHandler(fn: any) {
      return function (req: any, res: any, next: any) {
        fn(req, res, next).catch(next);
      };
    }
  }
}