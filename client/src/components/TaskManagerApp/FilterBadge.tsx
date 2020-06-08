/** @jsx jsx */
import { jsx, Badge } from "theme-ui";
import { Subject } from "../../store/Subject/SubjectStore";

export const FilterBadge: React.FC<{
  active?: boolean;
  subject: Subject;
  onClickHandler: (id: number) => void;
}> = ({ active, subject, onClickHandler, children }) => {
  return (
    <Badge
      variant={active ? "active" : "inactive"}
      sx={{
        cursor: active ? null : "pointer",
        margin: 1,
        ":hover": {
          color: active ? null : "primary",
          borderColor: active ? null : "primary"
        }
      }}
      onClick={() => {
        onClickHandler(subject.id);
      }}
    >
      {subject.title}
    </Badge>
  );
};
