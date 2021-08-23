import React from "react";
import { Switch } from "react-router-dom";
import Authors from "../pages/authors/Authors";
import Posts from "../pages/posts/Posts";
import LayoutRoute from "./LayoutRoute";

export default function Routes() {

  return (
    <Switch>
      <LayoutRoute exact path={"/"} component={Posts} />
      <LayoutRoute exact path={"/autores"} component={Authors} />
    </Switch>
  );
}
