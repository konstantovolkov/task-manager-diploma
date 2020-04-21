import { IsOptional, IsInt } from "class-validator";

export class SubjectAuthorQuery {
  @IsInt()
  authorId?: number;
}

export class SubjectsListQuery {
  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsOptional()
  @IsInt()
  subscriberId?: number
}
