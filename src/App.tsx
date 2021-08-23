import React from "react";
import { Router } from "react-router-dom";
import Routes from "./routes";
import history from "./routes/history";
import { UiProvider } from "./contexts/ui/UiContext";
import "./styles/vars.scss";
import "./styles/globals.scss";
import { BlogProvider } from "./contexts/blog/BlogContext";

function App() {
  return (
    <Router history={history}>
      <UiProvider>
        <BlogProvider>
          <Routes />
        </BlogProvider>
      </UiProvider>
    </Router>
  );
}

export default App;
