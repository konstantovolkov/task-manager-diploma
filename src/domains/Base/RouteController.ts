import { Router } from 'express';
import { INestedResourcesMap } from './INestedResourcesMap';

export abstract class RouteController {
  public readonly router: Router;

  constructor(nestedResoucesMap?: INestedResourcesMap[]) {
    this.router = Router({ mergeParams: true });
    this.initRoutes();
    nestedResoucesMap?.forEach(this.setRouterToPath.bind(this));
  }

  private setRouterToPath({ path, routeController }: INestedResourcesMap) {
    this.router.use(path, routeController.router);
  }

  abstract initRoutes(): void;
}
