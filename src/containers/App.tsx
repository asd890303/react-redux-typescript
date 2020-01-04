import "../styles/App.css";

import { HomeSubMenu, MainMenu } from "../lib/types/App";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { AppAction } from "../lib/actions";
import { AppState } from "../lib/store";
import Comment from "../compontents/message/comment/Comment";
import CommentList from "../compontents/message/comment/CommentList";
import CookieManager from "../lib/cookie/cookie";
import Fans from "../compontents/message/fans/Fans";
import Follow from "../compontents/follow/Follow";
import Footer from "../compontents/layout/Footer";
import Header from "../compontents/layout/Header";
import Home from "../compontents/home/Home";
import Like from "../compontents/message/like/Like";
import Login from "../compontents/login/Login";
import Message from "../compontents/message/Message";
import MessageDetail from "../compontents/message/MessageDetail";
import MessageDetailInfo from "../compontents/message/MessageDetailInfo";
import Mine from "../compontents/message/mine/Mine";
import PrivateRoute from "../compontents/base/PrivateRoute";
import Profile from "../compontents/profile/Profile";
import React from "react";
import Register from "../compontents/login/Register";
import UserInfoModel from "../models/api/userInfo";
import Video from "../compontents/video/Video";
import { connect } from "react-redux";

interface AppProps extends AppState, RouteComponentProps {
  tooggleMenu: typeof AppAction.tooggleMenu;
  toggleHomeSubMenu: typeof AppAction.toggleHomeSubMenu;
  userLogin: typeof AppAction.userLogin;
}

class App extends React.Component<AppProps> {
  CookieManager: CookieManager = new CookieManager();

  constructor(props: AppProps) {
    super(props);

    let user: string = this.CookieManager.getCookie("user");
    if (user) {
      let obj = {
        ...JSON.parse(user)
      };

      if (!this.props.app.isLogin) {
        this.props.userLogin(obj);
      }
    }

    console.log(props);
    console.log("isLogin:" + this.props.app.isLogin);
  }

  toggleHomeSubMenu = (target: HomeSubMenu) => {
    this.props.toggleHomeSubMenu(target);
  };

  toggleContent = (target: Number) => {
    this.props.tooggleMenu(target);
  };

  userLogin = (userInfo: UserInfoModel) => {
    this.props.userLogin(userInfo);
  };

  getContent() {
    const { currentMenu } = this.props.app;
    switch (currentMenu) {
      case MainMenu.Home:
        return <Home {...this.props} />;
      case MainMenu.Follow:
        return <Follow />;
      case MainMenu.Message:
        return <Message />;
      case MainMenu.Profile:
        return <Profile />;
      case MainMenu.Add:
        return <Home {...this.props} />;
    }
  }

  renderRouter = () => {
    const { currentMenu, currentHomeSubMenu } = this.props.app;
    return (
      <Switch>
        {/* Main */}
        <Route exact path="/">
          <Header
            currentMenu={currentMenu}
            currentHomeSubMenu={currentHomeSubMenu}
            toggleHomeSubMenu={this.toggleHomeSubMenu}
          />
          <div className="App-content">{this.getContent()}</div>
          <Footer index={MainMenu.Home} toogleMenu={this.toggleContent} />
        </Route>
        {/* video */}
        <PrivateRoute
          path="/video/:vid"
          component={Video}
          {...this.props}
        ></PrivateRoute>
        {/* login */}
        <Route
          exact
          path="/login"
          component={() => <Login {...this.props} />}
        />
        <Route exact path="/register" component={Register} />
        {/* <Route exact path="/video/:vid" component={Video}></Route> */}

        {/* msg */}
        {/* msgIcon-Manu */}
        <Route exact path="/msg/fans" component={Fans} />
        <Route exact path="/msg/like" component={Like} />
        <Route exact path="/msg/mine" component={Mine} />
        <Route exact path="/msg/comment" component={Comment} />
        <Route exact path="/msg/comment/list" component={CommentList} />
        {/* msg - official || system */}
        <Route exact path="/msg/:name" component={MessageDetail}></Route>
        <Route
          exact
          path="/msg/:name/:mid"
          component={MessageDetailInfo}
        ></Route>
      </Switch>
    );
  };

  public render() {
    console.log("render app");
    return <div className="App">{this.renderRouter()}</div>;
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
