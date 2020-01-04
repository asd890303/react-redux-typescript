import "bootstrap/dist/css/bootstrap.min.css";

import { AppAction } from "../../lib/actions";
import { AppState } from "../../lib/store";
import { Modal } from "react-bootstrap";
import PageLoading from "../base/PageLoading";
import React from "react";
import Register from "./Register";
import Request from "../../lib/services/request";
import ReturnButton from "../base/ReturnButton";
import { RouteComponentProps } from "react-router";
import UserInfoModel from "../../models/api/userInfo";

interface LoginProps extends RouteComponentProps, AppState {
  callbackUrl?: string;
  className?: string;
  isDialog?: boolean;
  isHidden?: boolean;
  onClose?: Function;
  userLogin: typeof AppAction.userLogin;
}

interface LoginState {
  apiMsg: string;
  isLoading: boolean;
  password: string;
  showModal: boolean;
  showRegister: boolean;
  userName: string;
}
export default class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      apiMsg: "",
      isLoading: false,
      password: "",
      showModal: false,
      showRegister: false,
      userName: ""
    };

    if (this.props.app.isLogin) {
      this.props.history.push("/");
    }
  }

  postLogin = () => {
    this.setState({
      isLoading: true
    });
    let body = {
      user_login: this.state.userName,
      user_pass: this.state.password
    };
    let req = new Request();
    req.get("Login", "userLogin", body, (response: any) => {
      this.setState({
        isLoading: false
      });
      if (response && response.data) {
        let token =
          response.data.info &&
          response.data.info[0] &&
          response.data.info[0].token;
        if (token) {
          let userInfo: UserInfoModel = response.data.info[0];
          console.log(userInfo);
          this.props.userLogin(userInfo);
          this.handleClose();
        } else {
          this.setModal(response.data.msg);
        }
      }
    });
  };

  setModal = (msg: string) => {
    this.setState({
      showModal: !this.state.showModal,
      apiMsg: msg
    });
  };

  handleCloseregister = () => {
    this.setState({
      showRegister: !this.state.showRegister
    });
  };

  handleClose = () => {
    if (this.props.isDialog && this.props.onClose) {
      this.props.onClose();
    } else if (this.props.location.state && this.props.location.state.next) {
      this.props.history.push(this.props.location.state.next);
    } else if (this.props.location.search) {
      let params = new URLSearchParams(this.props.location.search);
      let q: string = params.get("ref") || ".";
      this.props.history.push(q.split(".")[0] + "/" + q.split(".")[1]);
    } else {
      this.props.history.push("/");
    }
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  //暫時不支持
  handleOtherLogin = () => {};

  handleSubmit = (e: any) => {
    let form: any = document.getElementById("login-form");
    if (form && form.checkValidity()) {
      this.postLogin();
      e.preventDefault();
    }
  };

  toggleRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister
    });
  };

  public render() {
    console.log(this.props);
    return (
      <>
        <div
          id="login-dialog"
          className={
            !this.state.showRegister
              ? "dialog"
              : "dialog dialog-close dialog-backend"
          }
        >
          <ReturnButton />
          <form id="login-form">
            <div className="login-content">
              <p>登陆后体验更多精彩瞬间</p>
              <div className="login-input-content">
                <input
                  required
                  className="login-input"
                  minLength={6}
                  maxLength={12}
                  name="userName"
                  onChange={this.handleOnChange}
                  placeholder="输入用户名"
                  value={this.state.userName}
                ></input>
                <input
                  required
                  className="login-input"
                  name="password"
                  onChange={this.handleOnChange}
                  minLength={6}
                  maxLength={12}
                  placeholder="输入密码"
                  type="password"
                  value={this.state.password}
                ></input>
                <button
                  className="login-button"
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  立即登录
                </button>
                <br />
                <p onClick={this.toggleRegister} style={{ marginTop: 25 }}>
                  没有帐号？我要注册
                </p>
                {/* <p onClick={this.handleOtherLogin} style={{ padding: "15%" }}>
                  其他登錄方式
                </p> */}
              </div>
            </div>
          </form>
        </div>
        <Register
          {...this.props}
          className={
            this.state.showRegister
              ? "dialog"
              : "dialog dialog-close dialog-backend"
          }
          isDialog={true}
          onClose={this.handleCloseregister}
        />
        <Modal
          show={this.state.showModal}
          centered
          onHide={() => this.setModal("")}
        >
          <Modal.Body>
            <p style={{ textAlign: "center" }}>{this.state.apiMsg}</p>
          </Modal.Body>
        </Modal>
        <PageLoading isShow={this.state.isLoading} />
      </>
    );
  }
}
