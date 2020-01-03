import * as React from "react";

import MessageCell from "./MessageCell";
import MessageModel from "../../models/api/message";
import NavIconCell from "./nav/NavIconCell";
import Request from "../../lib/services/request";
import Swiper from "swiper";
import styled from "@emotion/styled";

const NavContainer = styled.div`
  background-color: #15112c;
  color: white;
  display: flex;
  flex-direction: row;
  text-align: center;
  padding: 10px 0;
`;

const EmptyBlock = styled.div`
  background-color: black;
  width: 100%;
  height: 20px;
`;

interface msgInfo {
  title: string;
  content: string;
  addtime: string;
}

interface MessageProps {}

interface MessageState {
  navIconList: {
    title: string;
    imgSrc: string;
    link: string;
  }[];
  messageList: MessageModel[];
  messageInfoList: msgInfo[];
  divHeight: number;
  appName: string;
}

export default class Message extends React.Component<
  MessageProps,
  MessageState
> {
  constructor(props: MessageProps) {
    super(props);

    this.state = {
      divHeight: 0,
      appName: "",
      navIconList: [
        {
          title: "粉丝",
          imgSrc: process.env.PUBLIC_URL + "./images/msgList/msg_fans.png",
          link: "/msg/fans"
        },
        {
          title: "赞",
          imgSrc: process.env.PUBLIC_URL + "./images/msgList/msg_zan.png",
          link: "/msg/like"
        },
        {
          title: "@我的",
          imgSrc: process.env.PUBLIC_URL + "./images/msgList/msg_linkme.png",
          link: "/msg/mine"
        },
        {
          title: "评论",
          imgSrc: process.env.PUBLIC_URL + "./images/msgList/msg_comment.png",
          link: "/msg/comment"
        }
      ],
      messageList: [],
      messageInfoList: []
    };
  }

  componentDidMount = () => {
    this.setState({
      divHeight: document.body.offsetHeight - 120
    });
    window.addEventListener("resize", this.handleResize);
    this.getMessageList();
    this.getAppName();
  };

  handleResize = () =>
    this.setState({
      divHeight: document.body.offsetHeight - 120
    });

  getMessageList = () => {
    let req = new Request();
    req.get("Message", "getLastTime", {}, (response: any) => {
      console.log(response);
      if (response && response.data) {
        this.initMessagePage(response.data.info);
      }
    });
  };

  getAppName = () => {
    let req = new Request();
    req.get("Home", "getConfig", {}, (response: any) => {
      console.log(response);
      if (response && response.data) {
        const data = response.data.info[0];
        this.setState({
          appName: data.app_name
        });
      }
    });
  };

  initMessagePage = (data: MessageModel[]) => {
    if (data.length > 0) {
      this.setState({
        messageList: data,
        messageInfoList: [{ ...data[0].officeInfo }, { ...data[0].sysInfo }]
      });
    }

    new Swiper(".swiper-container", {
      direction: "vertical",
      preloadImages: false,
      height: 60,
      allowSlidePrev: false,
      allowSlideNext: false
    });
  };

  timestampToDatetime = (time: string) => {
    let datetime = new Date();
    datetime.setTime(parseInt(time) * 1000);
    let month = String(
      (datetime.getMonth() + 1 < 10 ? "0" : "") + (datetime.getMonth() + 1)
    );
    let date = String(
      (datetime.getDate() < 10 ? "0" : "") + datetime.getDate()
    );
    let hour = String(
      (datetime.getHours() < 10 ? "0" : "") + datetime.getHours()
    );
    let minute = String(
      (datetime.getMinutes() < 10 ? "0" : "") + datetime.getMinutes()
    );

    return month + "-" + date + " " + hour + ":" + minute;
  };

  public render() {
    const containerStyle = {
      height: this.state.divHeight + "px",
      top: 60 + "px"
    };

    return (
      <div className="swiper-container" style={containerStyle}>
        <NavContainer>
          {this.state.navIconList.map((item, index) => {
            return (
              <NavIconCell
                toLink={item.link}
                title={item.title}
                imgSrc={item.imgSrc}
                index={index}
                key={"icon-cell-" + index}
              />
            );
          })}
        </NavContainer>
        <EmptyBlock></EmptyBlock>

        <div className="swiper-wrapper">
          {this.state.messageInfoList.map((item, index) => {
            return (
              <MessageCell
                key={"swiper-slide-msg" + index}
                index={index}
                toLink={index === 0 ? `/msg/official` : `/msg/system`}
                avatarSrc={
                  index === 0
                    ? process.env.PUBLIC_URL +
                      "./images/common/default_thumb.png"
                    : process.env.PUBLIC_URL +
                      "./images/msgList/msg_icon_sys.png"
                }
                officeAvatarSrc={
                  process.env.PUBLIC_URL + "./images/msgList/msg_gov.png"
                }
                title={index === 0 ? this.state.appName + "官方" : "系统通知"}
                content={item.title}
                date={index === 0 ? this.timestampToDatetime(item.addtime) : ""}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
