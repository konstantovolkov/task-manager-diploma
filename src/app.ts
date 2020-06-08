import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { useContainer, createExpressServer, Action } from "routing-controllers";
import { Container } from "typedi";
import { Request } from "express";
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

(async () => {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "konstantin_volkov",
    password: "1234",
    database: "konstantin_volkov",
    synchronize: true,
    entities: [User, Task, UserTask, Subject, UserCredentials, WorkingSession]
  });

  console.log(connection.isConnected);
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

server.listen(10000);

console.log("Server is up and running at port 10000");
