import axios from "axios";
import React, { Component } from "react";
// import axios from "axios";
import FormErrors from "./../../Member/FormErrors";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      avatar: "",
      formErrors: {},
      file: "",
      msg: "",
    };

    this.handleValue = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
  }

  handleValue(e) {
    let nameInput = e.target.name;
    let value = e.target.value;
    this.setState({
      [nameInput]: value,
    });
    //console.log(value);
  }
  componentDidMount() {
    const getInfo = localStorage.getItem("infoCus");
    // console.log(getInfo.Auth.name);
    if (getInfo) {
      const convInfo = JSON.parse(getInfo);
      this.setState({
        name: convInfo.Auth.name,
        email: convInfo.Auth.email,
        address: convInfo.Auth.address,
        phone: convInfo.Auth.phone,
      });
    } else {
      this.props.history.push("/login");
    }
  }
  handleSubmit(e) {
    //ngan chan su kien mac dinh

    e.preventDefault();
    const convInfo = JSON.parse(localStorage.getItem("infoCus"));
    let flag = true;
    let { name, file, password, phone, address } = this.state;

    let errSubmit = this.state.formErrors;
    const testEmai = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    const testPasss = /^[a-zA-Z0-9]+$/;

    //name
    if (name == "") {
      flag = false;
      errSubmit.name = "Name khong duoc de trong";
    } else {
      flag = true;
      errSubmit.name = "";
    }
    // //email
    // if (email === "") {
    //   flag = false;
    //   errSubmit.email = "Vui long nhap Email";
    // } else {
    //   if (!testEmai.test(email)) {
    //     flag = false;
    //     errSubmit.email = "Email khong hop le";
    //   } else {
    //     flag = true;
    //     errSubmit.email = "";
    //   }
    // }
    //pass
    if (password === "") {
      flag = false;
      errSubmit.password = "Vui long nhap Password";
    } else {
      if (password.toString().length < 8 && !testPasss.test(password)) {
        flag = false;
        errSubmit.password = "nhap it nhat 8 ky tu bao gom ca chu va so!";
      } else {
        flag = true;
        errSubmit.password = "";
      }
    }
    //phone
    if (phone === "") {
      flag = false;
      errSubmit.phone = "Vui long nhap so dien thoai";
    } else {
      flag = true;
      errSubmit.phone = "";
    }

    //address
    if (address === "") {
      flag = false;
      errSubmit.address = "Vui long nhap dia chi";
    } else {
      flag = true;
      errSubmit.address = "";
    }
    //avatar

    if (file) {
      if (file.size > 1024 * 1024) {
        flag = false;
        errSubmit.file = "anh tai len qua 1mb";
      } else {
        const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
        let res = file.name.split(".");

        if (!typeImg.includes(res[1])) {
          errSubmit.file = "vui long nhap dung dinh dang hinh anh";
        } else {
          flag = true;
          errSubmit.file = "";
        }
      }
    }

    if (!flag) {
      this.setState({
        formErrors: errSubmit,
      });
    } else {
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        address: this.state.address,
        avatar: this.state.avatar,
        level: 0,
      };
      const getIdUser = convInfo.Auth.id;
      let url = "http://localhost/laravel/public/api/user/update/" + getIdUser;
      // console.log(convInfo);
      const accessToken = convInfo.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("email", convInfo.Auth.email);
      formData.append("password", this.state.password);
      formData.append("phone", this.state.phone);
      formData.append("address", this.state.address);
      formData.append("image_user", this.state.avatar);

      axios.post(url, formData, config).then((res) => {
        console.log(res);
        if (res.data.errors) {
          this.setState({
            formErrors: res.data.errors,
          });
        } else {
          const convert = JSON.stringify(res.data);
          localStorage.setItem("infoCus", convert);
          this.setState({
            name: "",
            email: "",
            pass: "",
            phone: "",
            address: "",
            avatar: "",
            level: 0,
            msg: "update thanh cong ",
          });
        }
      });
    }
  }
  handleInputFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result, //gui qua api
        file: file[0], // de toan bo he thong file uploadvao file de xuong check validate
      });
    };
    reader.readAsDataURL(file[0]);
  }

  render() {
    return (
      <div className="col-sm-8 col-sm-offset-1">
        <div className="login-form">
          <h2>User UpDate!</h2>
          {this.state.msg}
          <FormErrors formErrors={this.state.formErrors} />
          <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleValue}
            />
            <input
              type="text"
              name="email"
              disabled
              value={this.state.email}
              placeholder="Email Address"
              onChange={this.handleValue}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleValue}
            />
            <input
              type="text"
              name="address"
              value={this.state.address}
              placeholder="Address"
              onChange={this.handleValue}
            />
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              placeholder="Phone Number"
              onChange={this.handleValue}
            />
            <input type="file" name="avatar" onChange={this.handleInputFile} />
            <button
              type="submit"
              className="btn btn-default"
              style={{ marginBottom: "20px" }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Update;
