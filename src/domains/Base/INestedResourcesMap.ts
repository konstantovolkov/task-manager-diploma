import { RouteController } from './RouteController';
import { Service } from './Service';

export interface INestedResourcesMap {
  path: string;
  routeController: RouteController<Service<unknown>>;
}
