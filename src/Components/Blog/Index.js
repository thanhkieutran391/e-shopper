import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeProduct from "../Product/HomeProduct";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <section id="content">
          <div className="col-sm-9 padding-right">
            <HomeProduct />
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Home);
