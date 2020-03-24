import { Server } from './utils/Server';
import { UserController } from './domains/User/User.controller';
import { createConnection } from 'typeorm';
import { User } from './domains/User/User.model';
import 'reflect-metadata';
import { UserTask } from './domains/UserTask/UserTask.model';
import { Subject } from './domains/Subject/Subject.model';
import { Task } from './domains/Task/Task.model';
import { SubjectController } from './domains/Subject/Subject.controller';

(async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'konstantin_volkov',
    password: '1234',
    database: 'konstantin_volkov',
    synchronize: true,
    entities: [User, Task, UserTask, Subject]
  });

  console.log(connection.isConnected);
})();

new Server([
  {
    path: '/users',
    routeController: new UserController()
  },
  {
    path: '/subjects',
    routeController: new SubjectController()
  }
]).start();
