import { Server } from './utils/Server';
import { UserController } from './domains/User/User.controller';

new Server([
  {
    path: '/users',
    routeController: new UserController()
  }
]).start();
