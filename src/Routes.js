import React, { lazy, Suspense } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";

import LoadingScreen from "./component/LoadingScreen";

function Routes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route
          path="/"
          render={props => (
            <HomeLayout {...props}>
              <Switch>
                <Redirect exact from="/" to="/all" />
                <Route
                  exact
                  path="/all"
                  component={lazy(() => import("./views/pages/AllView"))}
                />
                <Route
                  exact
                  path="/shortlisted"
                  component={lazy(() =>
                    import("./views/pages/ShortlistedView")
                  )}
                />
                <Route
                  exact
                  path="/404"
                  component={lazy(() => import("./views/pages/Error404View"))}
                />
                <Redirect to="/404" />
              </Switch>
            </HomeLayout>
          )}
        />
      </Switch>
    </Suspense>
  );
}

export default Routes;
