import * as React from "react";

import CommentModel from "../../../models/api/comment";

// MessageModel
interface CommentCellProps extends CommentModel {
  hasLike?: boolean;
  onClick?: Function;
}

export default class CommentCell extends React.Component<CommentCellProps> {
  handleClick = () => {
    this.props.onClick && this.props.onClick();
  };

  public render() {
    const { content, userinfo, datetime, likes, islike, hasLike } = this.props;
    const likeImg =
      islike === "1"
        ? process.env.PUBLIC_URL + "/images/comment/likecomment_sel.png"
        : process.env.PUBLIC_URL + "/images/comment/likecomment.png";

    return (
      <div className="comment-cell">
        <div className="comment-cell-avast">
          <img src={userinfo.avatar_thumb} alt="avast"></img>
        </div>
        <div className="comment-cell-content">
          <p>{userinfo.user_nicename}</p>
          <p>{datetime}</p>
          <div className="content">{content}</div>
        </div>
        {hasLike && (
          <div className="comment-cell-like">
            <img alt="like" src={likeImg}></img>
            <div>{likes}</div>
          </div>
        )}
      </div>
    );
  }
}
