import FooterCell from "./FooterCell";
import { MainMenu } from "../../types/App";
import React from "react";

interface FooterProps {
  index: MainMenu;
  toogleMenu: Function;
}
export default class Footer extends React.Component<FooterProps> {
  componentDidMount() {}
  state = {
    menuList: [
      {
        name: "首頁",
        imgSrc: process.env.PUBLIC_URL + "/images/tabBar/tab_home.png",
        selected: true
      },
      {
        name: "關注",
        imgSrc: process.env.PUBLIC_URL + "/images/tabBar/tab_follow.png",
        selected: false
      },
      {
        name: "",
        imgSrc: process.env.PUBLIC_URL + "/images/tabBar/tab_center.png",
        selected: false
      },
      {
        name: "消息",
        imgSrc: process.env.PUBLIC_URL + "/images/tabBar/tab_message.png",
        selected: false
      },
      {
        name: "我",
        imgSrc: process.env.PUBLIC_URL + "/images/tabBar/tab_mine.png",
        selected: false
      }
    ]
  };

  handleClick = (target: number) => {
    this.state.menuList.forEach((item, index) => {
      if (target === index) item.selected = true;
      else item.selected = false;
    });

    this.props.toogleMenu(target);
  };

  public render() {
    let cell = this.state.menuList.map((item, index) => {
      return (
        <FooterCell
          className={index === 2 ? "add-image" : ""}
          title={item.name}
          index={index}
          imgSrc={
            item.selected && index !== 2
              ? item.imgSrc.replace(".png", "_sel.png")
              : item.imgSrc
          }
          key={"footer-cell-" + index}
          toogleMenu={this.handleClick}
        />
      );
    });
    return <footer className="App-footer">{cell}</footer>;
  }
}
