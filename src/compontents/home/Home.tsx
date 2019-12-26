import "../../styles/home.css";

import * as React from "react";

import { HomeSubMenu } from "../../types/App";
import Hot from "./hot/Hot";
import Nearby from "./nearby/Nearby";
import Recommend from "./recommend/Recommend";

interface HomeProps {
  currentHomeSubMenu: HomeSubMenu;
}
interface HomeState {}
export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
  }

  state = {
    divHeight: 0
  };

  componentDidMount() {
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });
    window.addEventListener("resize", this.handleResize);
  }

  getHomePage = () => {
    switch (this.props.currentHomeSubMenu | 0) {
      case HomeSubMenu.Recommend:
        return <Recommend />;
      case HomeSubMenu.Hot:
        return <Hot />;
      case HomeSubMenu.Nearby:
        return <Nearby />;
    }
  };

  handleResize = () =>
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });

  public render() {
    return (
      <div
        className="swiper-container"
        style={{ height: this.state.divHeight + "px", top: "60px" }}
      >
        {this.getHomePage()}
      </div>
    );
  }
}