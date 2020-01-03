import * as React from "react";

import { EmptyMsgContainer } from "../../common/EmptyMsgContainer";
import MessageCell from "./MessageCell";
import MessageModel from "../../models/api/message";
import Request from "../../lib/services/request";
import ReturnButton from "../base/ReturnButton";
import { RouteComponentProps } from "react-router-dom";
import Swiper from "swiper";

interface MatchParams {
  name: string;
}

interface MessageDetailProp extends RouteComponentProps<MatchParams> {}
interface MessageDetailState {
  messageList: MessageModel[];
  divHeight: number;
  appName: string;
}

export default class MessageDetail extends React.Component<
  MessageDetailProp,
  MessageDetailState
> {
  constructor(props: MessageDetailProp) {
    super(props);

    this.state = {
      divHeight: 0,
      messageList: [],
      appName: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });
    window.addEventListener("resize", this.handleResize);
    this.getMessageList();
    this.getAppName();
  };

  handleResize = () =>
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });

  getMessageList = () => {
    let req = new Request();
    req.get(
      "Message",
      this.props.match.params.name === "official"
        ? "officialLists"
        : "systemnotifyLists",
      { param: "test" },
      (response: any) => {
        console.log(response);
        if (response && response.data) {
          this.initMessagePage(response.data.info);
        }
      }
    );
  };

  getAppName = () => {
    let req = new Request();
    req.get("Home", "getConfig", { param: "test" }, (response: any) => {
      console.log(response);
      if (response && response.data) {
        const data = response.data.info[0];
        this.setState({
          appName: data.app_name + "官方"
        });
      }
    });
  };

  initMessagePage = (data: MessageModel[]) => {
    if (data.length > 0) {
      this.setState({
        messageList: data
      });
    }

    console.log(this.state.messageList);

    new Swiper(".swiper-container", {
      direction: "vertical",
      preloadImages: false,
      height: 60,
      spaceBetween: 1
    });
  };

  public render() {
    const emptyMsg = {
      title: `暂无数据`,
      content: ``
    };

    const containerStyle = {
      height: this.state.divHeight + "px",
      top: 60 + "px"
    };

    return (
      <>
        <header className="App-header">
          <ReturnButton />
          {this.props.match.params.name === "official"
            ? this.state.appName
            : "系统通知"}
        </header>
        {this.state.messageList.length !== 0 ? (
          <div className="swiper-container" style={containerStyle}>
            <div className="swiper-wrapper">
              {this.state.messageList.map((item, index) => {
                return (
                  <MessageCell
                    key={"swiper-slide-msg" + index}
                    index={index}
                    toLink={
                      this.props.match.params.name === "official"
                        ? `/msg/official/` + item.id
                        : `/msg/system/` + item.id
                    }
                    isDetail={true}
                    avatarSrc={
                      this.props.match.params.name === "official"
                        ? process.env.PUBLIC_URL +
                          "/images/common/default_thumb.png"
                        : process.env.PUBLIC_URL +
                          "/images/msgList/msg_icon_sys.png"
                    }
                    officeAvatarSrc={
                      process.env.PUBLIC_URL + "/images/msgList/msg_gov.png"
                    }
                    title={item.title}
                    content={
                      this.props.match.params.name === "official"
                        ? item.synopsis
                        : item.content
                    }
                    date={item.addtime}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyMsgContainer style={containerStyle}>
            <div>
              <strong>{emptyMsg.title}</strong>
            </div>
          </EmptyMsgContainer>
        )}
      </>
    );
  }
}
