import { UserTask } from "./UserTask.model";
import { UserTaskService } from "./UserTask.service";
import { Service } from "typedi";
import {
  JsonController,
  Get,
  Put,
  Delete,
  OnUndefined,
  HttpCode,
  Body,
  Authorized,
  Post
} from "routing-controllers";
import { UserTaskNotFoundError } from "./UserTaskNotFoundError";
import { IntParam } from "../../utils/decorators/IntParam";
import { UserTasksNotFoundError } from "./UserTasksNotFoundError";
import { updateEntityOptions } from "../../utils/updateEntityOptions";
import { WorkingSession } from "./WorkingSession.model";

@Authorized()
@Service()
@JsonController("/users/:userId/tasks")
export class UserTaskController {
  constructor(private service: UserTaskService) {}

  @Get("/")
  @OnUndefined(UserTasksNotFoundError)
  async getAll(@IntParam("userId") userId: number) {
    return await this.service.getList(userId);
  }

  @Get("/:taskId")
  @OnUndefined(UserTaskNotFoundError)
  async getById(@IntParam("userId") userId: number, @IntParam("taskId") taskId: number) {
    return await this.service.getByTaskId(taskId, userId);
  }

  @Put("/:taskId")
  @HttpCode(201)
  @OnUndefined(UserTaskNotFoundError)
  async update(
    @IntParam("userId") userId: number,
    @Body(updateEntityOptions) userTask: UserTask,
    @IntParam("taskId") taskId: number
  ) {
    return await this.service.updateByTaskId(taskId, userTask, userId);
  }

  @Delete("/:taskId")
  @OnUndefined(UserTaskNotFoundError)
  async delete(@IntParam("userId") userId: number, @IntParam("taskId") taskId: number) {
    return await this.service.deleteTaskForUser(taskId, userId);
  }

  @Post("/:taskId/workingSessions")
  async addWorkingSession(
    @Body() session: WorkingSession,
    @IntParam("userId") userId: number,
    @IntParam("taskId") taskId: number
  ) {
    return await this.service.addWorkingSession(session, taskId, userId);
  }
}
