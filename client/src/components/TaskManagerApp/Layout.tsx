/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import React from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { Content } from "./Content";

export const Layout: React.FC = () => (
  <Grid
    as="section"
    sx={{
      gridTemplateRows: "min-content min-content 1fr",
      gap: 3,
      height: "100%",
      padding: "4px",
      minHeight: "100vh"
    }}
  >
    <Header userName="Konstantin Volkov" userRole="student" />
    <NavBar />
    <Content />
  </Grid>
);
