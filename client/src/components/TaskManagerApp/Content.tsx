/** @jsx jsx */
import { jsx, Grid, Heading, Donut } from "theme-ui";
import React from "react";
import { ChartSection } from "./ChartSection";
import { MainSection } from "./MainSection";
import { Switch, Route } from "react-router-dom";
import { StudentTaskList } from "./StudentsTaskList";
import { SubjectFilter } from "./SubjectFilter";
import { Progress } from "./Progress";
import { Timer } from "./Timer";
import { ActiveTask } from "./ActiveTask";

export const Content: React.FC = () => (
  <Grid
    gap={3}
    sx={{
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 2fr) minmax(250px, 1fr))",
      gap: 3,
      mx: 4,
      mb: 3
    }}
  >
    <MainSection>
      <Switch>
        <Route path="/todo">
          <Heading>Tasks you haven't started yet</Heading>
        </Route>
        <Route path="/progress">
          <Heading>Tasks in progress</Heading>
        </Route>
        <Route path="/done">
          <Heading>Accomplishments</Heading>
        </Route>
        <Route path="/active">
          <ActiveTask />
        </Route>
      </Switch>
      <Route exaxt path={["/todo", "/progress", "/done"]}>
        <SubjectFilter />
        <StudentTaskList />
      </Route>
    </MainSection>
    <ChartSection>
      <Switch>
        <Route exaxt path={["/todo", "/progress", "/done"]}>
          <Heading>Progress</Heading>
          <Progress />
        </Route>
        <Route path="/active">
          <Heading>Time tracker</Heading>
          <Timer />
        </Route>
      </Switch>
    </ChartSection>
  </Grid>
);
