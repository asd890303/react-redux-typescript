import React from "react";
import Request from "../../lib/services/request";
import ReturnButton from "../base/ReturnButton";
import { RouteComponentProps } from "react-router";

interface RegisterProps extends RouteComponentProps {
  callbackUrl?: string;
  className?: string;
  isDialog?: boolean;
  isHidden?: boolean;
  onClose?: Function;
}

interface RegisterState {
  captcha: string;
  confirmpwd: string;
  password: string;
  submitted: boolean;
  userName: string;
}
export default class Register extends React.Component<
  RegisterProps,
  RegisterState
> {
  constructor(props: RegisterProps) {
    super(props);

    this.handleOnChange.bind(this);
    this.state = {
      captcha: "",
      confirmpwd: "",
      password: "",
      submitted: false,
      userName: ""
    };
  }

  componentDidMount() {
    this.getCaptcha();
  }

  getCaptcha = () => {
    let req = new Request();
    req.get("Login", "getRandCode", {}, (response: any) => {
      if (response && response.data && response.data.info) {
        let code = response.data.info[0].regcode;
        let c: any = document.getElementById("login-captcha-canvas");
        if (c) {
          let ctx = c.getContext("2d");
          let textWidth = ctx.measureText(code).width;
          // clear canvas
          ctx.save();
          // ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.restore();

          ctx.textBaseline = "middle";
          ctx.textAlign = "center";
          ctx.font = "36px Arial";

          let getRndColor = function() {
            var r = (Math.floor(Math.random() * 56) + 200) | 0,
              g = (Math.floor(Math.random() * 56) + 200) | 0,
              b = (Math.floor(Math.random() * 56) + 200) | 0;

            return "rgb(" + r + "," + g + "," + b + ")";
          };

          ctx.strokeStyle = getRndColor();
          ctx.strokeText(
            code,
            (c.width - textWidth) / 2 + textWidth / 2,
            c.height / 2
          );
        }
      }
    });
  };

  // ???
  postRegUser = () => {
    let body = {
      user_login: this.state.userName,
      user_pass: this.state.password,
      user_pass2: this.state.confirmpwd,
      code: this.state.captcha
    };

    let req = new Request();
    req.get("Login", "userReg", body, (response: any) => {
      this.getCaptcha();
      if (response && response.data) {
        let msg = response.data.msg;
        let code = response.data.code;
        if (msg === "注册成功" || code === "0") {
          alert(msg);
          this.handleClose();
        } else {
          alert(msg);
        }
      }
    });
  };

  handleClose = () => {
    if (this.props.isDialog && this.props.onClose) {
      this.props.onClose();
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

  handleSubmit = (e: any) => {
    let form: any = document.getElementById("register-form");
    if (form && form.checkValidity()) {
      this.postRegUser();
      e.preventDefault();
    }
  };

  public render() {
    return (
      <div
        id="reg-dialog"
        hidden={this.props.isHidden}
        className={this.props.className ? this.props.className : "dialog"}
      >
        <ReturnButton onClick={this.handleClose} />
        <div className="login-content">
          <p>注册后体验更多精彩瞬间</p>
          <form id="register-form">
            <div className="login-input-content">
              <input
                required
                className="login-input"
                minLength={6}
                maxLength={12}
                name="userName"
                onChange={this.handleOnChange}
                placeholder="输入用户名(6-12位数字或字母)"
                value={this.state.userName}
              ></input>
              <input
                required
                className="login-input"
                name="password"
                onChange={this.handleOnChange}
                minLength={6}
                maxLength={12}
                placeholder="输入密码(6-12位数字及字母)"
                type="password"
                value={this.state.password}
              ></input>
              <input
                required
                className="login-input"
                name="confirmpwd"
                onChange={this.handleOnChange}
                minLength={6}
                maxLength={12}
                placeholder="确认密码(6-12位数字及字母)"
                type="password"
                value={this.state.confirmpwd}
              ></input>
              <div className="login-captcha">
                <input
                  required
                  className="login-input login-captcha-input"
                  name="captcha"
                  onChange={this.handleOnChange}
                  maxLength={12}
                  placeholder="输入验证码"
                  type="number"
                  value={this.state.captcha}
                ></input>
                <div className="login-captcha-img" onClick={this.getCaptcha}>
                  <canvas
                    id="login-captcha-canvas"
                    height="60"
                    width="150"
                  ></canvas>
                </div>
              </div>
              <button
                className="login-button"
                onClick={this.handleSubmit}
                type="submit"
              >
                立即注册
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
