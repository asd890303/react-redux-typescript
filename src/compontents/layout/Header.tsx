import { HomeSubMenu, MainMenu } from "../../types/App";

import React from "react";

interface HeaderProps {
  currentMenu: MainMenu;
  currentHomeSubMenu: HomeSubMenu;
  toggleHomeSubMenu: Function;
}
export default class Header extends React.Component<HeaderProps> {
  componentDidMount() {}

  toggleHomeSubMenu = (target: number) => {
    this.props.toggleHomeSubMenu(target);
  };

  initHeader = () => {
    const subMenu = ["推荐", "热门", "附近"];
    switch (this.props.currentMenu) {
      case MainMenu.Home:
        return (
          <header className="App-header">
            <div className="home-header">
              {subMenu.map((item, index) => {
                return (
                  <div
                    key={"home-header-" + index}
                    onClick={() => this.toggleHomeSubMenu(index)}
                    className={
                      this.props.currentHomeSubMenu === index ? "selected" : ""
                    }
                  >
                    {item}
                    {this.props.currentHomeSubMenu === index && (
                      <div className="selectedBlock" />
                    )}
                  </div>
                );
              })}
              <img
                className="header-search"
                alt="header-search"
                src={process.env.PUBLIC_URL + "/images/home/home_search.png"}
              ></img>
            </div>
          </header>
        );
      case MainMenu.Follow:
        return <header className="App-header">关注</header>;
      case MainMenu.Add:
        return;
      case MainMenu.Message:
        return <header className="App-header">消息</header>;
      case MainMenu.Profile:
        return;
    }
  };

  public render() {
    return <>{this.initHeader()}</>;
  }
}
