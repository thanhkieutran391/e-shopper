import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Rate from "./Rate";
import ListComment from "./ListComment";
import Comment from "./Comment";

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      comment: [],
      idReplay: "",
    };
    this.renderDetail = this.renderDetail.bind(this);
    this.getComment = this.getComment.bind(this);
    this.getIds = this.getIds.bind(this);
  }
  componentDidMount() {
    const getId = this.props.match.params.id;
    console.log(getId);
    axios
      .get("http://localhost/laravel/public/api/blog/detail/" + getId)
      .then((res) => {
        //console.log(res);
        this.setState({
          detail: res.data.data,
          comment: res.data.data.comment,
        });
      })
      .catch((error) => console.log(error));
  }
  renderDetail() {
    let { detail } = this.state;
    //let { comment } = this.state;
    // console.log(comment);
    /* console.log(detail)  */
    if (Object.keys(detail).length > 0) {
      // console.log(detail['image'])
      return (
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          <div className="single-blog-post">
            <h3>{detail["title"]}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" /> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <a href>
              <img
                src={
                  "http://localhost/laravel/public/upload/Blog/image/" +
                  detail["image"]
                }
                alt=""
              />
            </a>
            <p>{detail["description"]}</p>

            <div className="pager-area">
              <ul className="pager pull-right">
                <li>
                  <a href="#">Pre</a>
                </li>
                <li>
                  <a href="#">Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
  getComment(x) {
    //  console.log(x);
    this.setState({
      comment: this.state.comment.concat(x),
    });
  }
  getIds(y) {
    //console.log(y);
    this.setState({
      idReplay: y,
    });
  }
  render() {
    //console.log(this.state.comment);
    return (
      <div className="col-sm-9">
        {this.renderDetail()}

        <Rate getId={this.props.match.params.id} />

        <div className="socials-share">
          <a href>
            <img src="images/blog/socials.png" alt="" />
          </a>
        </div>

        <ListComment
          getId={this.props.match.params.id}
          comment={this.state.comment}
          getIds={this.getIds}
        />

        <Comment
          getId={this.props.match.params.id}
          getComment={this.getComment}
          getIds={this.state.idReplay}
        />
      </div>
    );
  }
}
export default withRouter(BlogDetail);
