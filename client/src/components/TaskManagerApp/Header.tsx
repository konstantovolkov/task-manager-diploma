/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import React from "react";
import UserAvatar from "react-user-avatar";

export const Header: React.FC<{ userName: string; userRole: string }> = ({
  userName,
  userRole
}) => {
  return (
    <Container
      as="header"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "60px",
        backgroundColor: "muted",
        boxShadow: "blockShadow",
        px: 3
      }}
    >
      <span
        sx={{
          marginRight: "auto"
        }}
      >
        Task Tracker
      </span>
      <span
        sx={{
          mx: 3
        }}
      >
        Logged in as {userName}, {userRole}
      </span>
      <UserAvatar size="48" name={userName} />
    </Container>
  );
};
