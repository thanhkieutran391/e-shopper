import axios from "axios";
import React, { Component } from "react";
import FormErrors from "../../Member/FormErrors";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: "",
      category: "",
      brand: "",
      categoryArr: [],
      brandArr: [],
      sale: 0,
      status: 1,
      des: "",
      company: "",
      file: "",
      img: "",
      imgArr: [],
      formErrors: {},
      msg: "",
      avatarCheckBox: [], // hinh anh muon xoa
    };

    this.handleValue = this.handleValue.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderBrand = this.renderBrand.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderImg = this.renderImg.bind(this);
    this.renderSale = this.renderSale.bind(this);
    this.handleAvatarCB = this.handleAvatarCB.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
  }
  handleAvatarCB(e) {
    let { avatarCheckBox } = this.state;
    let getImg = e.target.checked;
    // console.log(getImg);
    let nameImg = e.target.value;
    if (getImg) {
      avatarCheckBox.push(nameImg);
      this.setState({
        avatarCheckBox: avatarCheckBox,
      });
    } else {
      let index = avatarCheckBox.indexOf(nameImg);
      if (index > -1) {
        avatarCheckBox.splice(index, 1);
      }
    }
  }
  renderImg() {
    let { id } = this.state;
    let { imgArr } = this.state;

    if (imgArr.length > 0) {
      return imgArr.map((value, key) => {
        return (
          <li key={key} className="editImg">
            <img
              className="img_pc"
              src={
                "http://localhost/laravel/public/upload/user/product/" +
                id +
                "/" +
                value
              }
            />
            <input
              type="checkbox"
              value={value}
              className="check-img"
              onClick={this.handleAvatarCB}
            />
          </li>
        );
      });
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost/laravel/public/api/category-brand")
      .then((respon) => {
        this.setState({
          categoryArr: respon.data.category,
          brandArr: respon.data.brand,
        });
      });
    const getId = this.props.match.params.id;
    const editProduct = JSON.parse(localStorage.getItem("infoCus"));
    let urlProduct =
      "http://localhost/laravel/public/api/user/product/" + getId;
    let accessToken = editProduct.success.token;

    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(urlProduct, config).then((res) => {
      // console.log(res);
      if (res.data.errors) {
        this.setState({
          formErrors: res.data.errors,
        });
      } else {
        this.setState({
          name: res.data.data.name,
          brand: res.data.data.id_brand,
          category: res.data.data.id_category,
          price: res.data.data.price,

          company: res.data.data.company_profile,
          des: res.data.data.detail,
          status: res.data.data.status,
          imgArr: res.data.data.image,
          id: res.data.data.id_user,
          sale: res.data.data.sale,
        });
        //console.log(res.data.data.image);
      }
    });
  }

  handleValue(e) {
    let nameInput = e.target.name;
    let value = e.target.value;
    this.setState({
      [nameInput]: value,
    });
  }

  handleEdit(e) {
    e.preventDefault();
    const getId = this.props.match.params.id;
    let flag = true;
    let {
      name,
      price,
      category,
      brand,
      company,
      file,
      avatarCheckBox,
      imgArr,
    } = this.state;

    //

    //
    //

    //
    let errSubmit = this.state.formErrors;
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
      // avatarCheckBox,imgArr
      avatarCheckBox.map((value, key) => {
        let index = imgArr.indexOf(value);
        if (index > -1) {
          imgArr.splice(index, 1);
        }
      });

      if (Object.keys(file).length + imgArr.length > 3) {
        flag = false;
        errSubmit.file = "khong nhap qua 3 hinh anh";
        console.log(Object.keys(file).length + imgArr.length);
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
      const editPtData = JSON.parse(localStorage.getItem("infoCus"));
      let url =
        "http://localhost/laravel/public/api/user/edit-product/" + getId;
      const accessToken = editPtData.success.token;
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
      formData.append("sale", 0);

      Object.keys(file).map((key, index) => {
        formData.append("file[]", file[key]);
      });
      avatarCheckBox.map((value, key) => {
        formData.append("avatarCheckBox[]", value);
      });
      axios.post(url, formData, config).then((res) => {
        if (res.data.errors) {
          this.setState({
            formErrors: res.data.errors,
          });
        } else {
          this.setState({
            msg: "edit san pham thanh cong",
          });
        }
      });
    }
  }

  renderBrand() {
    let { brandArr } = this.state;
    return brandArr.map((value, key) => {
      return <option value={value["id"]}>{value["brand"]}</option>;
    });
  }

  renderCategory() {
    let { categoryArr } = this.state;

    return categoryArr.map((value, key) => {
      return <option value={value["id"]}>{value["category"]}</option>;
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
            value={this.state.sale}
            onChange={this.handleValue}
          />
          <span style={{ display: "inline-block" }}>%</span>
        </>
      );
    }
  }

  handleInputFile(e) {
    const file = e.target.files;
    this.setState({
      file: file,
    });
  }
  render() {
    return (
      <div className="col-sm-9">
        <div className="signup-form">
          <h2>Edit Product</h2>
          {this.state.msg}
          <FormErrors formErrors={this.state.formErrors} />
          <form
            action="#"
            enctype="multipart/form-data"
            onSubmit={this.handleEdit}
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
            <ul>{this.renderImg()}</ul>

            <textarea
              name="des"
              placeholder="Product Description"
              rows={11}
              defaultValue={""}
              value={this.state.des}
              onChange={this.handleValue}
            />

            <button type="submit" className="btn btn-default">
              Edit
            </button>
          </form>
        </div>
        {/*/sign up form*/}
      </div>
    );
  }
}

export default Edit;
