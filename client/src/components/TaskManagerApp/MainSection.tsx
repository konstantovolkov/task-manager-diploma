/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import React from "react";

export const MainSection: React.FC = ({ children }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "start",
        bg: "muted",
        boxShadow: "navTileInactive",
        borderRadius: "5px",
        py: 3,
        px: 4
      }}
    >
      {children}
    </Flex>
  );
};
