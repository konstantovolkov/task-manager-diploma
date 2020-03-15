import { Server } from './utils/Server';
import { UserController } from './domains/User/User.controller';
import { createConnection } from 'typeorm';

(async () => {
  const connection = await createConnection();

  console.log(connection.isConnected);
})()

new Server([
  {
    path: '/users',
    routeController: new UserController()
  }
]).start();