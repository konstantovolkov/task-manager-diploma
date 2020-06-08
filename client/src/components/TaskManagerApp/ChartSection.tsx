/** @jsx jsx */
import { jsx, Flex, Donut, Heading } from "theme-ui";
import React from "react";

export const ChartSection: React.FC = ({ children }) => (
  <Flex
    sx={{
      flexDirection: "column",
      alignItems: "stretch",
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
