import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

interface NavIconDetailCellProps {
  index: number;
  otherUid?: string;
  avatarSrc: string;
  otherUser: string;
  content: string;
  comment_content?: string;
  video_thumb?: string;
  videoid?: number;
  addtime: string;
  toLink: string;
  isAttention?: number;
  hasButton?: boolean;
  hasVideoThumb?: boolean;
  fromPage: string;
  onClick: Function;
}

const MsgCell = styled.div`
  background-color: #15112c;
  color: #969696;
  display: inline-flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Avatar = styled.div`
  flex: 1 1;
  position: relative;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Content = styled.div`
  flex: 7 1;
  position: relative;
  text-align: left;
  margin-left: 10px;

  div {
    padding: 2.5px 0;
    color: white;
  }
`;

const Other = styled.div`
  flex: 2 1;
  position: relative;
  z-index: 12;

  p {
    padding: 2.5px 0;
  }

  img {
    width: 100%;
    height: 80px;
  }
`;

const AttensionButton = styled.button`
  background-color: transparent;
  border-color: deeppink;
  width: 60px;
  height: 30px;
  border-radius: 30px;
  color: deeppink;
  cursor: pointer;
  outline: none;

  &.isAttention {
    border-color: #969696;
    color: #969696;
  }
`;

export default class NavIconCell extends React.Component<
  NavIconDetailCellProps
> {
  componentDidMount() {}

  handleAttention = () => {
    this.props.onClick(this.props.otherUid);
  };

  public render() {
    const greyColor = {
      color: "#969696"
    };

    const isAttention = Boolean(this.props.isAttention);

    return (
      <MsgCell className="swiper-slide">
        <Avatar>
          <img src={this.props.avatarSrc} alt={this.props.otherUser} />
        </Avatar>
        <Content>
          {this.props.fromPage === "like" && (
            <NavLink
              className="video-nav-link"
              to={`/video/` + this.props.videoid}
            ></NavLink>
          )}

          {this.props.fromPage === "mine" ||
          this.props.fromPage === "comment" ? (
            <NavLink className="msg-link" to={`/msg/comment/list`}></NavLink>
          ) : (
            ""
          )}

          <div>
            {this.props.otherUser}{" "}
            <span style={greyColor}>{this.props.content}</span>
          </div>
          {this.props.comment_content && (
            <div>{this.props.comment_content}</div>
          )}
          <div style={greyColor}>{this.props.addtime}</div>
        </Content>

        <Other>
          {this.props.hasButton && (
            <AttensionButton
              className={isAttention ? "isAttention" : ""}
              onClick={this.handleAttention}
            >
              {isAttention ? "已关注" : "关注"}
            </AttensionButton>
          )}
          {this.props.hasVideoThumb && (
            <>
              <NavLink
                className="video-nav-link"
                to={`/video/` + this.props.videoid}
              ></NavLink>
              <img
                src={this.props.video_thumb}
                alt={this.props.video_thumb}
                onClick={() => {}}
              />
            </>
          )}
        </Other>
      </MsgCell>
    );
  }
}
