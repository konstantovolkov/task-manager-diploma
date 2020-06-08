/** @jsx jsx */
import { jsx, Donut, Input, Label, Grid, Button, Flex } from "theme-ui";
import { useContext, useState } from "react";
import React from "react";
import { storeContext } from "../../store/storeContext";
import { getTimeString } from "../../utils/dateHelpers";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { TaskStatus } from "../../store/StudentTask/StudentTaskStore";

function getDonutValue(spentTime: number, estimatedTime: number) {
  if (spentTime >= estimatedTime) {
    return 1;
  } else {
    return spentTime / estimatedTime;
  }
}

export const Timer: React.FC = observer(() => {
  const { studentTaskStore } = useContext(storeContext);
  const activeTask = studentTaskStore.activeTask;
  const estimatedTime = activeTask?.task.estimatedTime || 1;
  const timer = studentTaskStore.timer || 0;
  const timeString = getTimeString(timer || 0);

  const [message, setMessage] = useState<string>("");
  const history = useHistory();

  return (
    <React.Fragment>
      <div
        css={{
          position: "relative"
        }}
      >
        <Donut
          color="primary"
          strokeWidth={5}
          size={270}
          value={getDonutValue(timer, estimatedTime)}
          sx={{
            width: "100%"
          }}
        />
        <span
          sx={{
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 4,
            fontWeight: "medium",
            color: "primary",
            lineHeight: 1
          }}
        >
          {timeString}
        </span>
      </div>

      {activeTask ? (
        <React.Fragment>
          <Label>Describe what you've done:</Label>
          <Input value={message} onChange={e => setMessage(e.target.value)} />
          <Flex
            sx={{
              my: 2,
              justifyContent: "space-between"
            }}
          >
            <Button
              onClick={() => {
                studentTaskStore.addWorkindSession(message);
                studentTaskStore.resetCurrentTask();
                history.push("/todo");
              }}
            >
              Commit
            </Button>
            <Button
              onClick={() => {
                studentTaskStore.addWorkindSession(message);
                studentTaskStore.toggleCurrentTaskStatus(TaskStatus.ON_REVIEW);
                studentTaskStore.resetCurrentTask();
                history.push("/todo");
              }}
            >
              Mark as done
            </Button>
            <Button
              onClick={() => {
                studentTaskStore.resetCurrentTask();
                history.push("/todo");
              }}
            >
              Reset
            </Button>
          </Flex>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
});
