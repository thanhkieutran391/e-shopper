import axios from "axios";
import React, { Component } from "react";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.renderProducts = this.renderProducts.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }
  componentDidMount() {
    const getLocal = localStorage.getItem("products");
    const products = JSON.parse(getLocal);
    axios
      .post("http://localhost/laravel/public/api/product/cart", products)
      .then((res) => {
        if (res.data.errors) {
          this.setState({
            formErrors: res.data.errors,
          });
        } else {
          this.setState({
            data: res.data.data,
          });
        }
      });
  }
  handleValue(e) {
    let nameInput = e.target.name;
    let value = e.target.defaultValue;
    this.setState({
      [nameInput]: value,
    });
  }
  renderProducts() {
    let { data } = this.state;
    console.log(data);
    if (data) {
      return data.map((value, key) => {
        let convert = JSON.parse(value["image"]);
        let imagePro = convert[0];
        console.log(value["id"], imagePro);
        return (
          <>
            <tbody key={key}>
              <tr>
                <td className="cart_product">
                  <a href>
                    <img
                      src={
                        "http://localhost/laravel/public/upload/user/product/" +
                        value["id_user"] +
                        "/" +
                        imagePro
                      }
                      alt={value["name"]}
                      style={{ width: "125px" }}
                    />
                  </a>
                </td>
                <td className="cart_description">
                  <h4>
                    <a href>{value["name"]}</a>
                  </h4>
                  <p>Web ID: {value["id"]}</p>
                </td>
                <td className="cart_price">
                  <p>${value["price"]}</p>
                </td>
                <td className="cart_quantity">
                  <div className="cart_quantity_button">
                    <a className="cart_quantity_up"> + </a>
                    <input
                      className="cart_quantity_input"
                      type="text"
                      name="quantity"
                      defaultValue={value["qty"]}
                      autoComplete="off"
                      size={2}
                      onChange={this.handleValue}
                    />
                    <a className="cart_quantity_down"> - </a>
                  </div>
                </td>
                <td className="cart_total">
                  <p className="cart_total_price">${value["price"]}</p>
                </td>
                <td className="cart_delete">
                  <a className="cart_quantity_delete">
                    <i className="fa fa-times" />
                  </a>
                </td>
              </tr>
            </tbody>
          </>
        );
      });
    }
  }
  render() {
    return (
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              {this.renderProducts()}
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default Cart;
