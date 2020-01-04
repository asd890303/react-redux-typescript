import { EmptyMsgContainer } from "../../../common/EmptyMsgContainer";
import MessageModel from "../../../models/api/message";
import NavIconDetailCell from "../nav/NavIconDetailCell";
import React from "react";
import Request from "../../../lib/services/request";
import ReturnButton from "../../base/ReturnButton";
import Swiper from "swiper";

interface FansProps {}

interface FansState {
  divHeight: number;
  messageList: MessageModel[];
}

export default class Fans extends React.Component<FansProps, FansState> {
  constructor(props: FansProps) {
    super(props);

    this.state = {
      messageList: [],
      divHeight: 0
    };
  }

  componentDidMount = () => {
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });
    window.addEventListener("resize", this.handleResize);
    this.getMessageList();
  };

  handleResize = () => {
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });
  };

  getMessageList = () => {
    let req = new Request();
    req.get("Message", "fansLists", {}, (response: any) => {
      console.log(response);
      if (response && response.data) {
        this.initFansPage(response.data.info);
      }
    });
  };

  handleAttention = (target: string) => {
    this.state.messageList.forEach((item, index) => {
      // 找到對應的他人id
      if (item.userinfo.id === target) {
        // setTimeout : 避免連按一直發送API
        setTimeout(() => {
          // 關注它人/取消關注 API
          let req = new Request();
          req.get("User", "setAttent", { touid: target }, (response: any) => {
            if (response && response.data) {
              let tempMessageList = [...this.state.messageList];
              item.isattention = Number(response.data.info[0].isattent);
              tempMessageList[index] = item;
              this.setState({
                messageList: tempMessageList
              });
            }
          });
        }, 100);
      }
    });
  };

  initFansPage = (data: MessageModel[]) => {
    console.log(data);
    if (data.length > 0) {
      this.setState({
        messageList: data
      });
    }

    new Swiper(".swiper-container", {
      direction: "vertical",
      preloadImages: false,
      height: 100
    });
  };

  public render() {
    const emptyMsg = {
      title: `你还没有收获粉丝`,
      content: ``
    };
    const containerStyle = {
      height: this.state.divHeight + "px",
      top: 60 + "px"
    };
    return (
      <>
        <header className="App-header header">
          <ReturnButton /> 粉丝
        </header>
        {this.state.messageList.length !== 0 ? (
          <div className="swiper-container" style={containerStyle}>
            <div className="swiper-wrapper">
              {this.state.messageList.map((item, index) => {
                return (
                  <NavIconDetailCell
                    key={"swiper-slide-msg" + index}
                    index={index}
                    otherUid={item.userinfo.id}
                    toLink={"/"}
                    avatarSrc={item.userinfo.avatar}
                    otherUser={item.userinfo.user_nicename}
                    content="关注了你"
                    addtime={item.addtime}
                    isAttention={item.isattention}
                    hasButton={true}
                    fromPage="fans"
                    onClick={this.handleAttention}
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
