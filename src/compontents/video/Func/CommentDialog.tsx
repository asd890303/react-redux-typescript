import * as React from "react";

import CommentCell from "../../base/Comment/CommentCell";
import CommentModel from "../../../models/api/comment";
import CommentReply from "../../base/Comment/CommentReply";
import Request from "../../../lib/services/request";
import ReturnButton from "../../base/ReturnButton";

interface CommentDialogProps {
  className?: string;
  isLogin: boolean;
  vid: string;
  onClose: Function;
}

interface CommentDialogState {
  apiMsg: string;
  className: string;
  comment: string;
  list: CommentModel[];
  showModal: boolean;
  total: string;
}
export default class CommentDialog extends React.Component<
  CommentDialogProps,
  CommentDialogState
> {
  constructor(props: CommentDialogProps) {
    super(props);
    this.state = {
      apiMsg: "",
      className: "dialog comment-slide",
      comment: "",
      list: [],
      showModal: false,
      total: "0"
    };
  }

  componentDidMount = () => {
    this.getCommentsList();
  };

  getCommentsList = () => {
    let req = new Request();
    req.get(
      "Video",
      "getComments",
      { videoid: this.props.vid },
      (response: any) => {
        if (response && response.data && response.data.info) {
          const info = response.data.info[0];
          const commentList = info.commentlist;
          if (commentList && commentList.length > 0)
            this.setState({
              total: info.comments,
              list: commentList
            });
        }
      }
    );
  };

  onClose = () => {
    this.setState({
      className: "dialog dialog-close comment-slide"
    });
    this.props.onClose();
  };

  handleSubmit = () => {
    this.getCommentsList();
  };

  handleClickInput = (e: any) => {
    if (!this.props.isLogin) {
      e.preventDefault();
      let href = this.props.vid
        ? "/login?ref=video." + this.props.vid
        : "/login";
      window.location.href = href;
    }
  };

  handleClickAt = () => {};

  public render() {
    return (
      <div className={this.state.className}>
        <ReturnButton onClick={this.onClose} isClose={true} />
        <div className="comment-dialog-header">
          <p>{this.state.total}&nbsp;评论</p>
        </div>
        <div className="comment-dialog-list">
          {this.state.list &&
            this.state.list.map(item => {
              return (
                <CommentCell
                  key={"comment-cell" + item.id}
                  hasLike={true}
                  {...item}
                />
              );
            })}
        </div>
        <CommentReply
          vid={this.props.vid}
          handleClickInput={this.handleClickInput}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
