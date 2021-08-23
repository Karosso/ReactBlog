import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
interface LayoutProps extends RouteProps {
  component: any;
}

const LayoutRoute: React.FC<LayoutProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default LayoutRoute;
