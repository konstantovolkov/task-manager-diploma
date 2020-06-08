import { observable, computed, action } from "mobx";
import { RootStore } from "../storeContext";

export class Subject {
  id: number;
  title: string;
  description: string;
}

export class SubjectStore {
  @observable subjects: Subject[] = [
    {
      id: 0,
      title: "Mathematics",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 1,
      title: "Progrimming",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 2,
      title: "Doing nothing!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];
  @observable currentSubjectId: number = this.subjects[0].id;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  setCurrentSubjectId(id: number) {
    this.currentSubjectId = id;
  }

  @computed
  get currentSubject() {
    return this.subjects.find(subject => subject.id === this.currentSubjectId);
  }
}
