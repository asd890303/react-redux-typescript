import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

interface MessageCellProps {
  id?: string;
  avatarSrc: string;
  officeAvatarSrc: string;
  title: string;
  content: string;
  date?: string;
  index: number;
  toLink: string;
  isDetail?: boolean;
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

  img:last-child {
    position: absolute;
    width: 40px;
    height: 20px;
    bottom: -5px;
    right: 5px;
  }
`;

const Content = styled.div`
  flex: 7 1;
  text-align: left;
  margin-left: 10px;

  div {
    padding: 2.5px 0;
  }
`;

const Other = styled.div`
  flex: 2 1;

  p {
    padding: 2.5px 0;
  }
`;

export default class NavIconCell extends React.Component<MessageCellProps> {
  componentDidMount() {}

  public render() {
    return (
      <MsgCell className="swiper-slide">
        {<NavLink className="msg-link" to={this.props.toLink}></NavLink>}
        <Avatar>
          <img src={this.props.avatarSrc} alt={this.props.title} />
          <img src={this.props.officeAvatarSrc} alt="官方" />
        </Avatar>
        <Content>
          <div style={{ color: "white" }}>{this.props.title}</div>
          <div>{this.props.content}</div>
          {this.props.isDetail ? <div>{this.props.date}</div> : ""}
        </Content>

        {this.props.isDetail ? (
          ""
        ) : (
          <Other>
            <p>{this.props.date}</p>
            <p></p>
          </Other>
        )}
      </MsgCell>
    );
  }
}
