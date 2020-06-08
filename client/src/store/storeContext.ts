import React from "react";
import { StudentTaskStore } from "./StudentTask/StudentTaskStore";
import { SubjectStore } from "./Subject/SubjectStore";

export class RootStore {
  studentTaskStore: StudentTaskStore;
  subjectStore: SubjectStore;
  constructor() {
    this.studentTaskStore = new StudentTaskStore(this);
    this.subjectStore = new SubjectStore(this);
  }
}

export const storeContext = React.createContext(new RootStore());
