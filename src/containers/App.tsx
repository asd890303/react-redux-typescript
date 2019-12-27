import "../styles/App.css";

import { HomeSubMenu, MainMenu } from "../types/App";

import { AppAction } from "../actions";
import { AppState } from "../store";
import Follow from "../compontents/follow/Follow";
import Footer from "../compontents/layout/Footer";
import Header from "../compontents/layout/Header";
import Home from "../compontents/home/Home";
import Message from "../compontents/message/Message";
import Profile from "../compontents/profile/Profile";
import React from "react";
import { connect } from "react-redux";

interface AppProps extends AppState {
  tooggleMenu: typeof AppAction.tooggleMenu;
  toggleHomeSubMenu: typeof AppAction.toggleHomeSubMenu;
}

class App extends React.Component<AppProps> {
  componentDidMount() {}

  constructor(props: AppProps) {
    super(props);
    console.log(props);
  }

  toggleHomeSubMenu = (target: HomeSubMenu) => {
    this.props.toggleHomeSubMenu(target);
  };

  toggleContent = (target: Number) => {
    this.props.tooggleMenu(target);
  };

  private getContent() {
    const { currentMenu, currentHomeSubMenu } = this.props.app;
    switch (currentMenu) {
      case MainMenu.Home:
        return <Home currentHomeSubMenu={currentHomeSubMenu} />;
      case MainMenu.Follow:
        return <Follow />;
      case MainMenu.Message:
        return <Message />;
      case MainMenu.Profile:
        return <Profile />;
      case MainMenu.Add:
        return <Home currentHomeSubMenu={currentHomeSubMenu} />;
    }
  }

  public render() {
    const { currentMenu, currentHomeSubMenu } = this.props.app;
    console.log("render app");
    return (
      <div className="App">
        <Header
          currentMenu={currentMenu}
          currentHomeSubMenu={currentHomeSubMenu}
          toggleHomeSubMenu={this.toggleHomeSubMenu}
        />
        <div className="App-content">{this.getContent()}</div>
        <Footer index={MainMenu.Home} toogleMenu={this.toggleContent} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  app: state.app
});

// dispatch
export default connect(mapStateToProps, {
  ...AppAction
})(App);

// export function mapDispatchToProps(dispatch: Dispatch<AppAction>) {
//   return {
//     tooggleMenu: () => dispatch(AppAction.tooggleMenu())
//   };
// }
