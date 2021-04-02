import React, { Component } from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Update from "./Member/Update";
import List from "./Product/List";
import AddNew from "./Product/AddNew";
import Edit from "./Product/Edit";

class Index extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/account/member" component={Update} />
            <Route path="/account/product" component={List} />
            <Route path="/account/addProduct" component={AddNew} />
            <Route path="/account/edit-product/:id" component={Edit} />
            <Route path="/account/delete-product/:id" component={List} />
          </Switch>
        </App>
      </Router>
    );
  }
}

export default Index;
