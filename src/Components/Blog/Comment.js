import React, { Component } from "react";
import axios from "axios";
import FormErrors from "../Member/FormErrors";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      msg: "",
      formErrors: {},
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
    //console.log(value)
  }
  handleSubmit(e) {
    e.preventDefault();
    let flag = true;

    let { message } = this.state;
    let errSubmit = this.state.formErrors;
    const check = localStorage.getItem("isLogin");
    if (!check) {
      window.location.href = "/login";
    } else {
      if (message === "") {
        flag = false;
        errSubmit.message = "Vui long nhap binh luan";
      } else {
        flag = true;
        errSubmit.message = "";
      }
      if (!flag) {
        this.setState({
          formErrors: errSubmit,
        });
      } else {
        const userData = JSON.parse(localStorage["infoCus"]);

        const getId = this.props.getId;
        //console.log(getId)
        let url = "http://localhost/laravel/public/api/blog/comment/ " + getId;

        console.log();
        let accessToken = userData.success.token;

        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        };

        const formData = new FormData();
        formData.append("id_blog", getId);
        formData.append("id_user", userData.Auth.id);
        formData.append(
          "id_comment",
          this.props.getIds ? this.props.getIds : 0
        );
        formData.append("comment", this.state.message);
        formData.append("image_user", userData.Auth.avatar);
        formData.append("name_user", userData.Auth.name);

        axios.post(url, formData, config).then((res) => {
          console.log(res);
          if (res.data.errors) {
            this.setState({
              formErrors: res.data.errors,
            });
          } else {
            this.props.getComment(res.data.data);
            this.setState({
              message: "",
              msg: "comment thanh cong ",
            });
          }
        });
      }
    }
  }

  render() {
    return (
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            {this.state.msg}
            <div className="text-area">
              <FormErrors formErrors={this.state.formErrors} />
              <form onSubmit={this.handleSubmit}>
                <div className="blank-arrow">
                  <label>Your Name</label>
                </div>
                <span>*</span>
                <textarea
                  name="message"
                  rows={11}
                  defaultValue={""}
                  value={this.state.value}
                  onChange={this.handleValue}
                />
                <button type="submit" className="btn btn-primary">
                  post comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
