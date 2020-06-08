/** @jsx jsx */
import { jsx, Grid, Styled, Flex, Button, SxStyleProp } from "theme-ui";
import React from "react";
import { StudentTask, TaskStatus } from "../../store/StudentTask/StudentTaskStore";
import {
  getDurationStringFromInt,
  getDateStringFromDate
} from "../../utils/dateHelpers";

const taskInfoStyle: SxStyleProp = {
  borderLeftWidth: "5px",
  borderLeftStyle: "solid",
  borderLeftColor: "primary",
  mt: 0,
  pl: 2,
  mr: "auto"
};

const InfoBlock: React.FC<{ allRow?: boolean }> = ({ children, allRow = false }) => (
  <div
    sx={
      allRow
        ? {
            ...taskInfoStyle,
            gridColumn: "1 / 3"
          }
        : taskInfoStyle
    }
  >
    {children}
  </div>
);

export const StudentTaskView: React.FC<{
  studentTask: StudentTask;
  onStartHandler?: () => void;
}> = ({ studentTask, onStartHandler }) => {
  const estimatedTimeDurationString = getDurationStringFromInt(
    studentTask.task.estimatedTime,
    ["days", "hours", "minutes"]
  );
  const summarizedSpentTime = studentTask.workingSessions.reduce(
    (previousValue, item) => {
      const { createdAt, finishedAt } = item;
      const duration = finishedAt.getTime() - createdAt.getTime();

      return previousValue + duration;
    },
    0
  );
  const summarizedSpentTimeString = getDurationStringFromInt(summarizedSpentTime, [
    "days",
    "hours",
    "minutes",
    "seconds"
  ]);

  return (
    <Grid
      sx={{
        gap: 3,
        gridTemplateColumns: "1fr 1fr",
        margin: 3
      }}
    >
      <InfoBlock>
        <Styled.h5>Title</Styled.h5>
        <Styled.p>{studentTask.task.title}</Styled.p>
      </InfoBlock>
      <InfoBlock allRow>
        <Styled.h5>Description</Styled.h5>
        <Styled.p>{studentTask.task.description}</Styled.p>
      </InfoBlock>
      <InfoBlock>
        <Styled.h5>Due</Styled.h5>
        <Styled.p>{getDateStringFromDate(studentTask.task.due)}</Styled.p>
      </InfoBlock>
      <InfoBlock>
        <Styled.h5>Estimated time</Styled.h5>
        <Styled.p>{estimatedTimeDurationString}</Styled.p>
      </InfoBlock>

      {studentTask.workingSessions.length ? (
        <InfoBlock allRow>
          <Styled.h5>Spent time</Styled.h5>
          <Styled.p>
            {summarizedSpentTimeString}
            {studentTask.workingSessions.map(workingSession => (
              <div
                sx={{
                  borderColor: "primary",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  px: 1,
                  my: 1
                }}
              >
                <Styled.h5>
                  {getDateStringFromDate(workingSession.createdAt)} -{" "}
                  {getDurationStringFromInt(
                    workingSession.finishedAt.getTime() -
                      workingSession.createdAt.getTime(),
                    ["days", "hours", "minutes", "seconds"]
                  )}
                </Styled.h5>
                <Styled.p>{workingSession.message}</Styled.p>
              </div>
            ))}
          </Styled.p>
        </InfoBlock>
      ) : null}
      <Flex
        sx={{
          gridColumn: "1 / 3",
          flexDirection: "row"
        }}
      >
        {onStartHandler &&
        (studentTask.status === TaskStatus.TODO ||
          studentTask.status === TaskStatus.IN_PROGRESS) ? (
          <Button
            onClick={() => {
              onStartHandler();
            }}
          >
            Start tracking
          </Button>
        ) : null}
      </Flex>
    </Grid>
  );
};
