import { ParamOptions } from "routing-controllers";
import { SubjectsListQuery } from "./SubjectListQuery";

export const getSubjectsOptions: ParamOptions = {
  validate: true,
  type: SubjectsListQuery,
  required: false 
}