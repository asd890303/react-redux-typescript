import "../../styles/home.css";
import "../../styles/swiper/swiper.min.css";

import * as React from "react";

import { AdTextModel } from "../../models/api/adText";
import { HomeSubMenu } from "../../lib/types/App";
import Hot from "./hot/Hot";
import Marquee from "../base/Marquee";
import Nearby from "./nearby/Nearby";
import Recommend from "./recommend/Recommend";
import Request from "../../lib/services/request";

interface HomeProps {
  currentHomeSubMenu: HomeSubMenu;
}
interface HomeState {
  adText: string;
  divHeight: number;
}
export default class Home extends React.Component<HomeProps, HomeState> {
  state = {
    adText: "message",
    divHeight: document.body.offsetHeight - 60
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize);
    this.getAdtextList();
  };

  getAdtextList = () => {
    let req = new Request();
    req.get("Video", "getAdtextList", {}, (response: any) => {
      if (response && response.data) {
        let adTextList: AdTextModel[] = response.data.info;
        let adTextMarquee = "";
        adTextList.map(
          item =>
            (adTextMarquee +=
              "<a href='" + item.textlink + "'>" + item.content + "</a>")
        );

        this.setState(prevState => ({
          ...prevState,
          adText: adTextMarquee
        }));
      }
    });
  };

  getHomePage = () => {
    switch (this.props.currentHomeSubMenu) {
      case HomeSubMenu.Recommend:
        return <Recommend />;
      case HomeSubMenu.Hot:
        return <Hot />;
      case HomeSubMenu.Nearby:
        return <Nearby />;
    }
  };

  handleResize = () => {
    this.setState(prevState => ({
      ...prevState,
      divHeight: document.body.offsetHeight - 60
    }));
  };

  public render() {
    return (
      <div
        className="swiper-container"
        style={{ height: this.state.divHeight }}
      >
        {this.props.currentHomeSubMenu === HomeSubMenu.Recommend && (
          <Marquee text={this.state.adText} />
        )}
        {this.getHomePage()}
      </div>
    );
  }
}
