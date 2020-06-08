/** @jsx jsx */
import { jsx } from "theme-ui";
import { observer } from "mobx-react";
import { useContext } from "react";
import { storeContext } from "../../store/storeContext";
import { Accordion } from "react-accessible-accordion";
import { AccordionSection } from "./AccordionSection";
import { StudentTaskView } from "./StudentTaskView";
import { useHistory } from "react-router-dom";

export const StudentTaskList: React.FC = observer(() => {
  const studentTaskStore = useContext(storeContext).studentTaskStore;
  const studentTasks = studentTaskStore.filtered;

  const history = useHistory();

  return (
    <Accordion
      allowZeroExpanded
      sx={{
        maxHeight: "-webkit-fill-available",
        overflowY: "auto"
      }}
    >
      {studentTasks?.map(studentTask => (
        <AccordionSection title={studentTask.task.title} key={studentTask.id}>
          <StudentTaskView
            studentTask={studentTask}
            onStartHandler={() => {
              const date = new Date();
              localStorage.setItem("currentActiveTaskId", studentTask.id.toString());
              localStorage.setItem("taskStartTime", date.getTime().toString());
              studentTaskStore.setActiveTaskId(studentTask.id);
              studentTaskStore.setTaskStartTimeDate(date);
              studentTaskStore.startTimer();
              history.push("/active");
            }}
          />
        </AccordionSection>
      ))}
    </Accordion>
  );
});
