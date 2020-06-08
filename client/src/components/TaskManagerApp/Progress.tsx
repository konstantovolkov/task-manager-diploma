/** @jsx jsx */
import { jsx, Grid, Heading, Donut, Button } from "theme-ui";
import React, { useContext } from "react";
import { observer } from "mobx-react";
import { storeContext } from "../../store/storeContext";
import { getDateStringFromDate } from "../../utils/dateHelpers";

export const Progress: React.FC = observer(() => {
  const { subjectStore, studentTaskStore } = useContext(storeContext);
  const currentSubject = subjectStore.currentSubject;
  const { doneCount, allCount, closestDeadline, todoCount } = studentTaskStore;

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
          value={allCount && doneCount ? doneCount / allCount : 0}
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
          {allCount ? `${doneCount}/${allCount}` : `0/0`}
          <br />
          done
        </span>
      </div>
      <h2>{currentSubject?.title}</h2>
      <p
        sx={{
          borderLeftWidth: "5px",
          borderLeftStyle: "solid",
          borderLeftColor: "primary",
          mt: 0,
          pl: 2,
          mr: "auto"
        }}
      >
        {currentSubject?.description}
      </p>
      <p
        sx={{
          borderLeftWidth: "5px",
          borderLeftStyle: "solid",
          borderLeftColor: "primary",
          mt: 0,
          pl: 2,
          mr: "auto"
        }}
      >
        {allCount !== doneCount
          ? `You have done ${doneCount} tasks of ${allCount}`
          : null}
      </p>
      <p
        sx={{
          borderLeftWidth: "5px",
          borderLeftStyle: "solid",
          borderLeftColor: "primary",
          mt: 0,
          pl: 2,
          mr: "auto"
        }}
      >
        {doneCount === allCount && allCount > 0
          ? "You have done everything!"
          : closestDeadline
          ? `Better start task "${
              closestDeadline.task.title
            }" due to its deadline  ${getDateStringFromDate(
              closestDeadline.task.due
            )}`
          : null}
      </p>
    </React.Fragment>
  );
});
