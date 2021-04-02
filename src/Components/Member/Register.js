import React, { Component } from "react";
import FormErrors from "./FormErrors";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pass: "",
      phone: "",
      address: "",
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
    // console.log(value)
  }
  handleSubmit(e) {
    //ngan chan su kien mac dinh
    e.preventDefault();
    let flag = true;
    let { name, file, email, pass, phone, address } = this.state;

    let errSubmit = this.state.formErrors;
    const testEmai = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    const testPasss = /^[a-zA-Z0-9]+$/;

    //name
    if (name === "") {
      flag = false;
      errSubmit.name = "Vui long nhap name";
    } else {
      flag = true;
      errSubmit.name = "";
    }
    //email
    if (email === "") {
      flag = false;
      errSubmit.email = "Vui long nhap Email";
    } else {
      if (!testEmai.test(email)) {
        flag = false;
        errSubmit.email = "Email khong hop le";
      } else {
        flag = true;
        errSubmit.email = "";
      }
    }
    //pass
    if (pass === "") {
      flag = false;
      errSubmit.pass = "Vui long nhap Password";
    } else {
      if (pass.toString().length < 8 && !testPasss.test(pass)) {
        flag = false;
        errSubmit.pass = "nhap it nhat 8 ky tu bao gom ca chu va so!";
      } else {
        flag = true;
        errSubmit.pass = "";
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

    if (file === "") {
      flag = false;
      errSubmit.file = "vui long nhap avatar";
    } else {
      if (file.size > 1024 * 1024) {
        flag = false;
        errSubmit.file = "anh tai len qua 1mb";
      } else {
        const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"];

        let res = file.name.split(".");

        if (!typeImg.includes(res[1])) {
          errSubmit.file = "vui long nhap dung dinh dang hinh anh";
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
        password: this.state.pass,
        phone: this.state.phone,
        address: this.state.address,
        avatar: this.state.avatar,
        level: 0,
      };
      axios
        .post("http://localhost/laravel/public/api/register", data)
        .then((res) => {
          if (res.data.errors) {
            this.setState({
              formErrors: res.data.errors,
            });
          } else {
            this.setState({
              name: "",
              email: "",
              pass: "",
              phone: "",
              address: "",
              avatar: "",
              level: 0,
              msg: "ok",
            });
          }
        });
    }
  }
  handleInputFile(e) {
    const file = e.target.files;
    //console.log(file)
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result, //gui qua api
        file: file[0], // de toan bo he thong file uploadvao file de xuong check validate
      });
    };
    reader.readAsDataURL(file[0]);

    // khi vua set vao state xong thi k dc goi lien, vichua dongbo
  }

  render() {
    // console.log(this.state.file)

    return (
      <div className="col-sm-9">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>New User Signup!</h2>
          {this.state.msg}
          <FormErrors formErrors={this.state.formErrors} />
          <form
            action="#"
            onSubmit={this.handleSubmit}
            enctype="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.value}
              onChange={this.handleValue}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={this.state.value}
              onChange={this.handleValue}
            />
            <input
              type="password"
              placeholder="Password"
              name="pass"
              value={this.state.value}
              onChange={this.handleValue}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={this.state.value}
              onChange={this.handleValue}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={this.state.value}
              onChange={this.handleValue}
            />
            <input
              type="file"
              name="avatar"
              value={this.state.value}
              onChange={this.handleInputFile}
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
export default Register;
