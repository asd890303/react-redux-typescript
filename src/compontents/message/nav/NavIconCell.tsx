import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

const Cell = styled.div`
  position: relative;
  flex: 1 1;

  img {
    width: 50px;
    height: 50px;
  }
`;

interface NavIconCellProps {
  imgSrc: string;
  title: string;
  index: number;
  toLink: string;
}

export default class NavIconCell extends React.Component<NavIconCellProps> {
  componentDidMount() {}

  public render() {
    return (
      <Cell>
        {<NavLink className="msg-link" to={this.props.toLink} />}
        <img src={this.props.imgSrc} alt={this.props.title}></img>
        <div>{this.props.title}</div>
      </Cell>
    );
  }
}
