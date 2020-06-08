import { useContext } from "react";
import React from "react";
import { storeContext } from "../../store/storeContext";
import { Heading } from "theme-ui";
import { StudentTaskView } from "./StudentTaskView";
import { observer } from "mobx-react";

export const ActiveTask: React.FC = observer(() => {
  const { studentTaskStore } = useContext(storeContext);
  const activeTask = studentTaskStore.activeTask;
  const pageTitle = activeTask ? activeTask.task.title : "No active task found!";

  return (
    <>
      <Heading>{pageTitle}</Heading>
      {activeTask ? <StudentTaskView studentTask={activeTask} /> : null}
    </>
  );
});
