import React, { Component } from "react";
import FormErrors from "./FormErrors";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: "",
      email: "",
      formErrors: {},
      msg: "",
    };
    this.handleValue = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    e.preventDefault();
    let flag = true;
    let { pass, email } = this.state;
    const errSubmit = this.state.formErrors;
    const testEmai = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    const testPasss = /^[a-zA-Z0-9]+$/;
    if (pass === "") {
      flag = false;
      errSubmit.pass = "Vui long nhap Password";
    } else {
      if (pass.toString().length < 8 && !testPasss.test(pass)) {
        flag = false;
        errSubmit.pass = "nhap it nhat 8 ky tu bao gom ca chu va so!";
      }
    }
    if (email === "") {
      flag = false;
      errSubmit.email = "Vui long nhap Email";
    } else {
      if (!testEmai.test(email)) {
        flag = false;
        errSubmit.email = "Email khong hop le";
      }
    }
    if (!flag) {
      this.setState({
        formErrors: errSubmit,
      });
    } else {
      const data = {
        password: this.state.pass,
        email: this.state.email,
        level: 0,
      };
      axios
        .post("http://localhost/laravel/public/api/login", data)
        .then((res) => {
          if (res.data.errors) {
            this.setState({
              formErrors: res.data.errors,
            });
          } else {
            const convert = JSON.stringify(res.data);
            localStorage.setItem("infoCus", convert);
            console.log(convert);
            localStorage.setItem("isLogin", true);
            //console.log(res.data)
            this.setState({
              pass: "",
              email: "",
              level: 0,
              msg: "ok",
            });
            this.props.history.push("/");
          }
        });
    }
  }

  render() {
    return (
      <div className="col-sm-8 col-sm-offset-1">
        <div className="login-form">
          {/*login form*/}
          <h2>Login to your account</h2>
          {this.state.msg}
          <FormErrors formErrors={this.state.formErrors} />
          <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
            <input
              type="email"
              name="email"
              value={this.state.value}
              placeholder="Email Address"
              onChange={this.handleValue}
            />
            <input
              type="password"
              name="pass"
              value={this.state.value}
              placeholder="Password"
              onChange={this.handleValue}
            />
            <span>
              <input
                type="checkbox"
                className="checkbox"
                name="checkBox"
                value={this.state.value}
                onChange={this.handleValue}
              />
              Keep me signed in
            </span>
            <button type="submit" className="btn btn-default">
              Login
            </button>
          </form>
        </div>
        {/*/login form*/}
      </div>
    );
  }
}

export default withRouter(Login);
