import { ThemeProvider } from "theme-ui";
import React from "react";
import theme from "./components/TaskManagerApp/theme";
import { Layout } from "./components/TaskManagerApp/Layout";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { AuthForm } from "./components/Auth/AuthForm/AuthForm";
import { formConfig } from "./utils/formConfig";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/*
        
        <Redirect to="/auth" />
        <AuthForm formConfig={formConfig} />*/}
        <Redirect to="/todo" />
        <Layout />
      </Router>
    </ThemeProvider>
  );
};

export default App;
