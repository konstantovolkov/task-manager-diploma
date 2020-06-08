/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import React, { useContext } from "react";
import { NavTile } from "./NavTile";
import { storeContext } from "../../store/storeContext";
import { TaskStatus } from "../../store/StudentTask/StudentTaskStore";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";

export const NavBar: React.FC = observer(() => {
  const { studentTaskStore } = useContext(storeContext);
  const activeTask = studentTaskStore.activeTask;
  const activeTaskTileTitle = activeTask ? activeTask.task.title : "No active task";

  return (
    <Grid
      gap={3}
      sx={{
        mx: 4,
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
      }}
    >
      <NavTile
        title="What to do"
        data="15 tasks"
        route="/todo"
        action={() => {
          studentTaskStore.setStatusFilter([TaskStatus.TODO]);
        }}
      />
      <NavTile
        title="Continue doing"
        data="7 tasks"
        route="/progress"
        action={() => {
          studentTaskStore.setStatusFilter([TaskStatus.IN_PROGRESS]);
        }}
      />
      <NavTile
        title="Accomplishments"
        data="10 tasks"
        route="/done"
        action={() => {
          studentTaskStore.setStatusFilter([TaskStatus.ON_REVIEW, TaskStatus.DONE]);
        }}
      />
      <NavTile
        title="Current active task"
        data={activeTaskTileTitle}
        route="/active"
      />
    </Grid>
  );
});
