import * as React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";

import Api from "../api/api"
import Form from "../form/form";

type AllProps = RouteComponentProps<{}>;

class Routing extends React.Component<AllProps, never> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Form} />
        <Route exact={true} path="/api" component={Api} />
      </Switch>
    );
  }
}

export default withRouter(Routing);
