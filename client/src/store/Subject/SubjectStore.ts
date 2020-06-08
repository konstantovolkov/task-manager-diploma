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
        "The abstract science of number, quantity, and space, either as abstract concepts, or as applied to other disciplines such as physics and engineering "
    },
    {
      id: 1,
      title: "Progrimming",
      description:
        "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing result."
    },
    {
      id: 2,
      title: "English",
      description:
        "English is a West Germanic language that was first spoken in early medieval England and eventually became a global lingua franca."
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
