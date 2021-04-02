import axios from "axios";
import React, { Component } from "react";
import FormErrors from "../../Member/FormErrors";

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      category: "",
      brand: "",
      categoryArr: [],
      brandArr: [],
      sale: "",
      status: 1,
      des: "",
      company: "",
      file: "",
      formErrors: {},
      msg: "",
    };
    this.handleValue = this.handleValue.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderBrand = this.renderBrand.bind(this);
    this.renderSale = this.renderSale.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost/laravel/public/api/category-brand")
      .then((res) => {
        console.log(res);
        this.setState({
          categoryArr: res.data.category,
          brandArr: res.data.brand,
        });
      });
  }
  renderSale() {
    let { status } = this.state;
    if (status == 0) {
      return (
        <>
          <input
            id="productSale"
            type="text"
            name="sale"
            placeholder="0"
            value={this.state.value}
            onChange={this.handleValue}
          />
          <span style={{ display: "inline-block" }}>%</span>
        </>
      );
    }
  }
  renderCategory() {
    let { categoryArr } = this.state;
    return categoryArr.map((value, key) => {
      return <option value={value["id"]}>{value["category"]}</option>;
    });
  }

  renderBrand() {
    let { brandArr } = this.state;
    return brandArr.map((value, key) => {
      return <option value={value["id"]}>{value["brand"]}</option>;
    });
  }

  handleValue(e) {
    let nameInput = e.target.name;
    let value = e.target.value;
    this.setState({
      [nameInput]: value,
    });
  }

  handleInputFile(e) {
    const file = e.target.files;
    this.setState({
      file: file,
    });
  }

  addProduct(e) {
    e.preventDefault();
    let flag = true;
    let { name, price, category, brand, file, company } = this.state;
    let errSubmit = this.state.formErrors;
    // nameProduct
    if (name === "") {
      flag = false;
      errSubmit.name = "vui long nhap ten san pham";
    }

    // price
    if (price === "") {
      flag = false;
      errSubmit.price = "vui long nhap gia san pham";
    }

    // category
    if (category === "") {
      flag = false;
      errSubmit.category = "vui long nhap category";
    }

    //brand
    if (brand === "") {
      flag = false;
      errSubmit.brand = "vui long nhap brand";
    }

    // company
    if (company === "") {
      flag = false;
      errSubmit.company = "vui long nhap cong ty";
    }

    //  img
    if (file == "") {
      flag = false;
      errSubmit.file = "vui long nhap anh";
    } else {
      //   console.log(file);
      if (Object.keys(file).length > 3) {
        flag = false;
        errSubmit.file = "khong nhap qua 3 hinh anh";
      } else {
        if (file.size > 1024 * 1024) {
          flag = false;
          errSubmit.file = "anh tai len qua 1mb";
        } else {
          const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"];

          Object.keys(file).map((key, index) => {
            const res = file[key]["name"].split(".");

            if (!typeImg.includes(res[1])) {
              errSubmit.file = "vui long nhap dung dinh dang hinh anh";
            }
          });
        }
      }
    }

    if (!flag) {
      this.setState({
        formError: errSubmit,
      });
    } else {
      const productData = JSON.parse(localStorage.getItem("infoCus"));
      let urlProduct = "http://localhost/laravel/public/api/user/add-product";

      let accessToken = productData.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      let formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("category", this.state.category);
      formData.append("brand", this.state.brand);
      formData.append("price", this.state.price);
      formData.append("detail", this.state.des);
      formData.append("company", this.state.company);
      formData.append("status", this.state.status);
      formData.append("sale", this.state.sale);

      //
      Object.keys(file).map((value, key) => {
        formData.append("file[]", file[value]);
      });
      axios.post(urlProduct, formData, config).then((res) => {
        if (res.data.errors) {
          this.setState({
            formErrors: res.data.errors,
          });
        } else {
          this.setState({
            name: "",
            price: "",
            category: "",
            brand: "",
            des: "",
            sale: "",
            company: "",
            status: 1,
            file: "",
            msg: "them san pham thanh cong",
          });
          console.log(res);
        }
      });
    }
  }
  render() {
    return (
      <div className="col-sm-9">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>Create Product</h2>
          {this.state.msg}
          <FormErrors formErrors={this.state.formErrors} />
          <form
            action="#"
            enctype="multipart/form-data"
            onSubmit={this.addProduct}
          >
            <input
              type="text"
              placeholder="Name Product"
              name="name"
              value={this.state.name}
              onChange={this.handleValue}
            />

            <input
              type="text"
              placeholder="Price"
              name="price"
              value={this.state.price}
              onChange={this.handleValue}
            />

            <select
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleValue}
            >
              <option value="">Category</option>
              {this.renderCategory()}
            </select>

            <select
              type="text"
              name="brand"
              value={this.state.brand}
              onChange={this.handleValue}
            >
              <option value="">Brand</option>
              {this.renderBrand()}
            </select>

            <select
              type="text"
              name="status"
              value={this.state.status}
              onChange={this.handleValue}
            >
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>

            {this.renderSale()}
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={this.state.company}
              onChange={this.handleValue}
            />
            <input
              type="file"
              name="img"
              multiple
              onChange={this.handleInputFile}
            />
            <textarea
              name="des"
              placeholder="Product Description"
              rows={11}
              defaultValue={""}
              value={this.state.des}
              onChange={this.handleValue}
            />

            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
        </div>
        {/*/sign up form*/}
      </div>
    );
  }
}

export default AddNew;
