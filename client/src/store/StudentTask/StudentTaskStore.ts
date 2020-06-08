import { observable, action, computed, reaction } from "mobx";
import { RootStore } from "../storeContext";
import axios from "axios";

export enum TaskStatus {
  TODO = "to do",
  IN_PROGRESS = "in progress",
  ON_REVIEW = "on review",
  DONE = "done"
}

export class Task {
  id: number;
  title: string;
  description: string;
  estimatedTime: number;
  subjectId: number;
  due: Date;
}

class WorkingSession {
  id: number;
  createdAt: Date;
  finishedAt: Date;
  message: string;

  constructor(id: number, createdAt: Date, finishedAt: Date, message: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
    this.message = message;
  }
}

export class StudentTask {
  id: number;
  status: TaskStatus;
  task: Task;
  workingSessions: WorkingSession[];
}

export class StudentTaskStore {
  @observable studentTasks: StudentTask[] = [
    {
      id: 1,
      status: TaskStatus.TODO,
      workingSessions: [],
      task: {
        id: 1,
        title: "Calculate 2 + 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        estimatedTime: 120000,
        subjectId: 0,
        due: new Date()
      }
    },
    {
      id: 2,
      status: TaskStatus.DONE,
      workingSessions: [],
      task: {
        id: 1,
        title: "Calculate 1 + 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        estimatedTime: 646346,
        subjectId: 0,
        due: new Date()
      }
    },
    {
      id: 3,
      status: TaskStatus.DONE,
      workingSessions: [],
      task: {
        id: 1,
        title: "Calculate 2 + 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        estimatedTime: 646346,
        subjectId: 1,
        due: new Date()
      }
    },
    {
      id: 4,
      status: TaskStatus.IN_PROGRESS,
      workingSessions: [
        {
          id: 0,
          createdAt: new Date(100000),
          finishedAt: new Date(200000),
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        },
        {
          id: 1,
          createdAt: new Date(100000),
          finishedAt: new Date(300000),
          message: "eiusmod tempor incididunt ut labore et dolore magna aliqua"
        }
      ],
      task: {
        id: 1,
        title: "Calculate everything",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut labore et dolore magna aliqua.",
        estimatedTime: 20 * 60 * 1000,
        subjectId: 0,
        due: new Date()
      }
    }
  ];
  @observable statusFilter: TaskStatus[] = [TaskStatus.TODO];
  @observable currentActiveTaskId?: number;
  @observable taskStartTimeDate?: Date;
  @observable timer?: number;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    const activeTaskIdString = localStorage.getItem("currentActiveTaskId");
    this.currentActiveTaskId = activeTaskIdString
      ? parseInt(activeTaskIdString)
      : undefined;
    const taskStartTimeString = localStorage.getItem("taskStartTime");
    this.taskStartTimeDate = taskStartTimeString
      ? new Date(parseInt(taskStartTimeString))
      : undefined;

    this.startTimer();
  }

  @action.bound
  addWorkindSession(message: string) {
    if (this.taskStartTimeDate && this.activeTaskTimeDuration && this.timer) {
      const studentTask = this.studentTasks.find(
        studentTask => studentTask.id === this.currentActiveTaskId
      );
      if (studentTask) {
        studentTask.workingSessions.push(
          new WorkingSession(
            100,
            this.taskStartTimeDate,
            new Date(this.taskStartTimeDate.getTime() + this.timer),
            message
          )
        );
        if (studentTask.status === TaskStatus.TODO) {
          studentTask.status = TaskStatus.IN_PROGRESS;
        }
      }
    }
  }

  @action.bound
  toggleCurrentTaskStatus(taskStatus: TaskStatus) {
    if (this.currentActiveTaskId) {
      const studentTask = this.studentTasks.find(
        studentTask => studentTask.id === this.currentActiveTaskId
      );
      if (studentTask) {
        studentTask.status = taskStatus;
      }
    }
  }

  @action.bound
  startTimer() {
    setInterval(() => {
      if (this.taskStartTimeDate) {
        this.timer = new Date().getTime() - this.taskStartTimeDate.getTime();
      }
    }, 1000);
  }

  @computed
  get activeTaskTimeDuration() {
    if (this.taskStartTimeDate) {
      return new Date().getTime() - this.taskStartTimeDate.getTime();
    }
    return null;
  }

  @computed
  get activeTask() {
    if (this.currentActiveTaskId) {
      return this.studentTasks.find(
        studentTask => studentTask.id === this.currentActiveTaskId
      );
    }
  }

  @action.bound
  resetCurrentTask() {
    localStorage.clear();
    this.taskStartTimeDate = undefined;
    this.timer = undefined;
    this.currentActiveTaskId = undefined;
  }

  @action.bound
  setStatusFilter(filter: TaskStatus[]) {
    this.statusFilter = filter;
  }

  @action.bound
  setActiveTaskId(id: number) {
    this.currentActiveTaskId = id;
  }

  @action.bound
  setTaskStartTimeDate(date: Date) {
    this.taskStartTimeDate = date;
  }

  @computed
  get filtered() {
    return this.getCurrentSubjectTasks().filter(studentTask => {
      return this.statusFilter.includes(studentTask.status);
    });
  }

  @computed
  get allCount() {
    return this.getCurrentSubjectTasks().length;
  }

  @computed
  get todoCount() {
    return this.getCurrentSubjectTasks().filter(
      studentTask => studentTask.status === TaskStatus.TODO
    ).length;
  }

  @computed
  get doneCount() {
    return this.getCurrentSubjectTasks().filter(
      studentTask => studentTask.status === TaskStatus.DONE
    ).length;
  }

  @computed
  get closestDeadline() {
    const sortedByAsc = this.getCurrentSubjectTasks().sort((a, b) => {
      const { estimatedTime: firstEstimatedTime, due: firstDue } = a.task;
      const { estimatedTime: secondEstimatedTime, due: secondDue } = b.task;

      if (firstDue < secondDue) {
        return -1;
      } else if (firstDue == secondDue) {
        return 0;
      } else {
        return 1;
      }
    });

    if (sortedByAsc) {
      return sortedByAsc[0];
    } else {
      return null;
    }
  }

  private getCurrentSubjectTasks() {
    const currentSubjectId = this.rootStore.subjectStore.currentSubjectId;

    const filteredItems = this.studentTasks.filter(
      studentTask => studentTask.task.subjectId === currentSubjectId
    );

    if (filteredItems.length) {
      return filteredItems;
    }
    return [];
  }
}
