import { SubjectAuthorQuery } from "./SubjectListQuery";
import { ParamOptions } from "routing-controllers";

export const createSubjectOptions: ParamOptions = {
  validate: true,
  type: SubjectAuthorQuery,
  required: true
}