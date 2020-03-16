import { Router } from 'express';
import { INestedResourcesMap } from './INestedResourcesMap';
import { Service } from './Service';
import { UserService } from '../User/User.service';
import { User } from '../User/User.model';

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
