import "reflect-metadata";
import { createConnection } from "typeorm";
import { useContainer, createExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { authorizationChecker } from "./utils/authorizationChecker";

import { UserController } from "./domains/User/User.controller";
import { SubjectController } from "./domains/Subject/Subject.controller";
import { TaskController } from "./domains/Task/Task.controller";
import { UserTaskController } from "./domains/UserTask/UserTask.controller";
import { AuthController } from "./domains/Auth/Auth.controller";

import { User } from "./domains/User/User.model";
import { UserTask } from "./domains/UserTask/UserTask.model";
import { UserCredentials } from "./domains/Auth/UserCredentials.model";
import { Subject } from "./domains/Subject/Subject.model";
import { Task } from "./domains/Task/Task.model";
import { WorkingSession } from "./domains/UserTask/WorkingSession.model";
import vars from "./variables";

const { DB_PORT, APP_PORT, DB_PASSWORD, DB_USERNAME, DB_NAME } = vars;

(async () => {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    entities: [User, Task, UserTask, Subject, UserCredentials, WorkingSession]
  });
})();

useContainer(Container);

const server = createExpressServer({
  cors: true,
  authorizationChecker,
  controllers: [
    UserController,
    SubjectController,
    TaskController,
    UserTaskController,
    AuthController
  ]
});

server.listen(APP_PORT);

console.log(`Server is up and running at port ${APP_PORT}`);
