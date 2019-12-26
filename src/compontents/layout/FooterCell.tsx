import React from "react";

interface FooterCellProps {
  className?: string;
  imgSrc: string;
  index: number;
  title: string;
  toogleMenu: Function;
}
export default class FooterCell extends React.Component<FooterCellProps> {
  componentDidMount() {}

  handleClick = () => {
    this.props.toogleMenu(this.props.index);
  };

  public render() {
    let className = "footer-cell";

    if (this.props.className) {
      className = className + " " + this.props.className;
    }
    return (
      <div className={className} onClick={this.handleClick}>
        <img src={this.props.imgSrc} alt={this.props.title}></img>
        {this.props.title}
      </div>
    );
  }
}
