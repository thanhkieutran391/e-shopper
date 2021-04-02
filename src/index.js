import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./Components/Blog/Index";
import Blog from "./Components/Blog/BlogContent";
import BlogDetail from "./Components/Blog/BlogDetail";
import Register from "./Components/Member/Register";
import Login from "./Components/Member/Login";
import Account from "./Components/Account/Index";
import Cart from "./Components/Product/Cart";
ReactDOM.render(
  <React.StrictMode>
    <div>
      <Router>
        <App>
          <Switch>
            <Route exact path="/home" component={Index} />
            <Route path="/blog/list" component={Blog} />
            <Route path="/blog/detail/:id" component={BlogDetail} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route component={Account} />
          </Switch>
        </App>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
