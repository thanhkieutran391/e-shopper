import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuLeft extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Account</h2>
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a href="#">Account</a>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to="/account/product"
                    data-toggle="collapse"
                    data-parent="#accordian"
                    href="#sportswear"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    My Product
                  </Link>
                </h4>
              </div>
              <div id="sportswear" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul>
                    <li>
                      <Link to="/account/addProduct">Add Product</Link>
                    </li>
                    <li>
                      <Link to="/account/edit-product">Edit</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuLeft;
