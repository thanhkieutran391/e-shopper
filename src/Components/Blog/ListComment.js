import React, { Component } from "react";

class ListComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: [],
    };
    this.renderListComment = this.renderListComment.bind(this);
    this.replay = this.replay.bind(this);
  }
  replay(e) {
    let getIds = e.target.id;
    this.props.getIds(getIds);
    //console.log(getIds);
  }
  renderListComment() {
    let comment = this.props.comment;

    // console.log(comment);
    if (comment.length > 0) {
      return comment.map((value, key) => {
        // console.log(id);
        // so sanh kieu
        // "0" === 0
        if (value["id_comment"] == 0) {
          return (
            <>
              <li className="media">
                <a className="pull-left" href="#">
                  <img
                    className="media-object"
                    src={
                      "http://localhost/laravel/public/upload/user/avatar/" +
                      value["image_user"]
                    }
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {value["name_user"]}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" /> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar" /> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{value["comment"]}</p>
                  <a
                    className="btn btn-primary"
                    id={value["id"]}
                    onClick={this.replay}
                  >
                    <i className="fa fa-reply" />
                    Replay
                  </a>
                </div>
              </li>
              {comment.map((value2, key2) => {
                if (value2["id_comment"] == value["id"]) {
                  return (
                    <li className="media second-media">
                      <a className="pull-left" href="#">
                        <img
                          className="media-object"
                          src={
                            "http://localhost/laravel/public/upload/user/avatar/" +
                            value2["image_user"]
                          }
                          alt=""
                        />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li>
                            <i className="fa fa-user" />
                            {value2["name_user"]}
                          </li>
                          <li>
                            <i className="fa fa-clock-o" /> 1:33 pm
                          </li>
                          <li>
                            <i className="fa fa-calendar" /> DEC 5, 2013
                          </li>
                        </ul>
                        <p>{value2["comment"]}</p>
                      </div>
                    </li>
                  );
                }
              })}
            </>
          );
        }
      });
    }
  }

  render() {
    return (
      <div className="response-area">
        <h2>{this.props.comment.length} RESPONSES</h2>
        <ul className="media-list">{this.renderListComment()}</ul>
      </div>
    );
  }
}
export default ListComment;
