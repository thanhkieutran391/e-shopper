import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},

      formErrors: {},
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage["infoCus"]);

    const url = "http://localhost/laravel/public/api/user/my-product";
    let accessToken = userData.success.token;

    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        this.setState({
          detail: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
  handleRemove(e) {
    let getId = e.target.id;

    // console.log(detail);

    const userData = JSON.parse(localStorage["infoCus"]);
    const url =
      "http://localhost/laravel/public/api/user/delete-product/" + getId;
    //console.log(url);
    let accessToken = userData.success.token;
    //console.log(accessToken);
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        //console.log(res.data.data);
        this.setState({
          detail: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  }

  renderDetail() {
    let { detail } = this.state;

    // [
    //   xxx.png,
    //   aaa.png
    // ]
    // => json
    // "[xxx.png,aaa.png]"
    // =>array
    if (Object.keys(detail).length > 0) {
      return Object.keys(detail).map((key, index) => {
        const convertImg = JSON.parse(detail[key]["image"]);
        let img = convertImg[0];
        return (
          <tbody>
            <tr>
              {/* id */}
              <td className="cart_product">
                <a href>
                  <p style={{ marginTop: "10px" }}>{detail[key]["id"]}</p>
                </a>
              </td>
              {/* name */}
              <td className="cart_description">
                <h4>
                  <a href>{detail[key]["name"]}</a>
                </h4>
              </td>
              {/* image */}
              <td className="cart-product">
                <a href>
                  <img
                    src={
                      "http://localhost/laravel/public/upload/user/product/" +
                      detail[key]["id_user"] +
                      "/" +
                      convertImg[0]
                    }
                    style={{ width: "100px" }}
                  />
                </a>
              </td>
              {/* price */}
              <td className="cart_price">
                <p>${detail[key]["price"]}</p>
              </td>
              {/* action */}
              <td className="cart_price">
                <Link to={"/account/edit-product/" + detail[key]["id"]}>
                  edit
                </Link>
                <br />
                <a id={detail[key]["id"]} onClick={this.handleRemove}>
                  delete
                </a>
              </td>
            </tr>
          </tbody>
        );
      });
    }
  }

  render() {
    return (
      <div className="col-sm-9">
        <section id="cart_items">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="id">ID</td>
                  <td className="description">Name</td>
                  <td className="image">Image</td>
                  <td className="price">Price</td>
                  <td className="action">Action</td>
                  <td />
                </tr>
              </thead>
              {this.renderDetail()}
            </table>
            <button className="btn">
              <Link to="/account/addProduct">Add New</Link>
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default List;
