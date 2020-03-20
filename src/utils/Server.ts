import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import { errorHandler } from '../midlewares/errorHandler';
import { notFoundHandler } from '../midlewares/notFoundHandler';
import { INestedResourcesMap } from '../domains/Base/INestedResourcesMap';

export class Server {
  private server: Application;

  constructor(pathToRouterMap: INestedResourcesMap[]) {
    this.server = express();

    this.initMiddlewares();
    this.initRoutes(pathToRouterMap);
    this.initErrorHandlers();
  }

  private initMiddlewares() {
    this.server.use(express.json());
  }

  private initRoutes(pathToRouter: INestedResourcesMap[]) {
    pathToRouter.forEach(({ path, routeController }) => {
      this.server.use(path, routeController.router);
    });
  }

  private initErrorHandlers() {
    this.server.use(errorHandler);
    this.server.use((err: any, res: any, req: any, next: any) => {
      res.status(404).send(err.message);
    })
    this.server.use(notFoundHandler);
  }

  start() {
    dotenv.config();

    if (!process.env.PORT) {
      process.exit(1);
    }

    const PORT: number = parseInt(process.env.PORT as string, 10);

    this.server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  }
}
