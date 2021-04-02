import axios from "axios";
import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import FormErrors from "../Member/FormErrors";

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      msg: "",
      formErrors: {},
    };
    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    const getId = this.props.getId;
    axios
      .get("http://localhost/laravel/public/api/blog/rate/" + getId)
      .then((res) => {
        // console.log(res);
        let total = 0;
        let id = res.data.data;
        console.log(id);
        id.map((value, key) => {
          //console.log(value["rate"]);
          total = total + value["rate"];
        });
        let avg = total / id.length;
        this.setState({
          rating: avg,
        });
      })
      //console.log()
      .catch((error) => console.log(error));
  }
  changeRating(newRating, name) {
    const check = localStorage.getItem("isLogin");
    if (!check) {
      alert("vui long dang nhap!!!");
    } else {
      this.setState({
        rating: newRating,
      });
      const getId = this.props.getId;
      let url = "http://localhost/laravel/public/api/blog/rate/ " + getId;
      const userData = JSON.parse(localStorage["infoCus"]);
      //console.log(userData.Auth.id);
      let accessToken = userData.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      const formData = new FormData();
      formData.append("blog_id", getId);
      formData.append("user_id", userData.Auth.id);
      formData.append("rate", newRating);

      //console.log(formData);
      axios.post(url, formData, config).then((res) => {
        // console.log(res);
        if (res.data.errors) {
          this.setState({
            formErrors: res.data.errors,
          });
        } else {
          this.setState({
            msg: res.data.message,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="rating-area">
        {this.state.msg}
        <FormErrors formErrors={this.state.formErrors} />
        <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
        />
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <a className="color" href>
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href>
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href>
              Girls
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Rate;
