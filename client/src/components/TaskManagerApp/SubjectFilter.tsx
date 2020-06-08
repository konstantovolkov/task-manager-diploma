/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import { observer } from "mobx-react";
import { useContext } from "react";
import { storeContext } from "../../store/storeContext";
import { FilterBadge } from "./FilterBadge";

export const SubjectFilter: React.FC = observer(() => {
  const subjectStore = useContext(storeContext).subjectStore;
  const subjects = subjectStore.subjects;

  return (
    <Flex
      sx={{
        mb: 3,
        flexWrap: "wrap"
      }}
    >
      {subjects.map(subject => (
        <FilterBadge
          key={subject.id}
          active={subjectStore.currentSubjectId === subject.id ? true : false}
          onClickHandler={subjectStore.setCurrentSubjectId}
          subject={subject}
        ></FilterBadge>
      ))}
    </Flex>
  );
});
