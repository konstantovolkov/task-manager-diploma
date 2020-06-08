/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, useRouteMatch } from "react-router-dom";
import React from "react";

function trimStringToLength(string: string, requiredLength: number): string {
  const stringLength = string.length;

  if (stringLength > requiredLength) {
    const lastSpaceIndex = string.lastIndexOf(" ", stringLength);

    let result;
    if (lastSpaceIndex === -1) {
      result = string.slice(0, requiredLength) + "…";
    } else {
      result = string.slice(0, lastSpaceIndex) + "…";
    }

    return result;
  }

  return string;
}

export const NavTile: React.FC<{
  title: string;
  data: string;
  route: string;
  action?: () => void;
}> = ({ title, data, route, action }) => {
  const match = useRouteMatch(route);
  const exactMatch = match?.isExact;

  if (exactMatch && action) {
    action();
  }

  return (
    <Link
      to={route}
      sx={{
        display: "flex",
        textDecoration: "none",
        flexDirection: "column",
        justifyContent: "start",
        bg: exactMatch ? "primary" : "muted",
        boxShadow: "navTileInactive",
        borderRadius: "5px",
        minHeight: "70px",
        color: exactMatch ? "muted" : "inactiveText",
        whiteSpace: "pre-wrap",
        ":hover": {
          cursor: "pointer",
          boxShadow: "navTileActive",
          color: exactMatch ? null : "activeText"
        },
        px: 3,
        py: 2
      }}
    >
      <span
        sx={{
          fontSize: 4,
          fontWeight: "medium",
          lineHeight: 1
        }}
      >
        {trimStringToLength(data, 22)}
      </span>
      <span
        sx={{
          fontSize: 3
        }}
      >
        {title}
      </span>
    </Link>
  );
};
