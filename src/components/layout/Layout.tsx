import React from "react";
import Header from "../header/Header";
import "./Layout.module.scss";

export const Layout: React.FC = (props) => {
  return (
    <div id="container">
      <Header />
      {props.children}
    </div>
  );
};
