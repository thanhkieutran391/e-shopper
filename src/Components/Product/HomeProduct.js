import axios from "axios";
import React, { Component } from "react";

import { AppContext } from "../../AppContext";

class HomeProduct extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      products: [],
      obj: {},
    };
    this.renderProduct = this.renderProduct.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost/laravel/public/api/product")
      .then((res) => {
        this.setState({
          products: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
  renderProduct() {
    let { products } = this.state;
    if (products.length > 0) {
      return products.map((value, key) => {
        let convert = JSON.parse(value["image"]);

        let imagePro = convert[0];

        return (
          <div className="col-sm-4" key={key}>
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
                    src={
                      "http://localhost/laravel/public/upload/user/product/" +
                      value["id_user"] +
                      "/" +
                      imagePro
                    }
                    alt={value["name"]}
                  />
                  <h2>${value["price"]}</h2>
                  <p>{value["name"]}</p>
                  <a href="#" className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${value["price"]}</h2>
                    <p>{value["name"]}</p>
                    <a
                      id={value["id"]}
                      className="btn btn-default add-to-cart"
                      onClick={this.handleBuy}
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square" />
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square" />
                      Add to compare
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  handleBuy(e) {
    let getId = e.target.id;
    let { qty, obj } = this.state;
    console.log(getId);
    let flag = true;

    // add moi

    let getLocal = localStorage.getItem("products");

    //tang qty
    if (getLocal) {
      obj = JSON.parse(getLocal);
      let qty = Object.keys(obj).length;
      // this.context.getQty(qty);
      Object.keys(obj).map((key, index) => {
        console.log(key);
        if (getId == key) {
          obj[key] = obj[key] + 1;
          flag = false;
        }
      });
    }

    if (flag) {
      console.log(111);
      obj[getId] = qty;
    }

    this.context.getlengthCart(Object.keys(obj).length);
    const convert = JSON.stringify(obj);
    localStorage.setItem("products", convert);
  }

  render() {
    return (
      <div className="features_items">
        {/*features_items*/}
        <h2 className="title text-center">Features Items</h2>

        {this.renderProduct()}
      </div>
    );
  }
}

export default HomeProduct;

// id: product
// qty: 1
// {
//   id: qty
// }
// => localStorage.

// mua lan 2
// lay local ra
// {
//   15: 2,
//   16: 1
// }
