import { UserController } from './domains/User/User.controller';
import { createConnection } from 'typeorm';
import { User } from './domains/User/User.model';
import 'reflect-metadata';
import { UserTask } from './domains/UserTask/UserTask.model';
import { Subject } from './domains/Subject/Subject.model';
import { Task } from './domains/Task/Task.model';
import { SubjectController } from './domains/Subject/Subject.controller';
import { TaskController } from './domains/Task/Task.controller';
import { UserTaskController } from './domains/UserTask/UserTask.controller';
import { useContainer, createExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

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


useContainer(Container);

const server = createExpressServer({
  //defaultErrorHandler: false,
  controllers: [
    UserController,
    SubjectController,
    TaskController
  ]
})

server.listen(3000);

console.log("Server is up and running at port 3000");