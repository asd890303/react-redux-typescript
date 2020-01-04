import * as React from "react";

interface ReturnButtonProps {
  isClose?: boolean;
  history?: any;
  onClick?: Function;
}
export default class ReturnButton extends React.Component<ReturnButtonProps> {
  componentDidMount = () => {};
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    } else {
      if (this.props.history) {
        this.props.history.goBack();
      } else {
        window.history.back();
      }
    }
  };
  public render() {
    return (
      <div
        className={this.props.isClose ? "close-button" : "return-button"}
        onClick={this.handleClick}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/common/pub_back@2x.png"}
          alt="reutrn-button"
        ></img>
      </div>
    );
  }
}
