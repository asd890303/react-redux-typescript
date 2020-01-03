import { EmptyMsgContainer } from "../../../common/EmptyMsgContainer";
import MessageModel from "../../../models/api/message";
import NavIconDetailCell from "../nav/NavIconDetailCell";
import React from "react";
import Request from "../../../lib/services/request";
import ReturnButton from "../../base/ReturnButton";
import Swiper from "swiper";

interface LikeProps {}
interface LikeState {
  divHeight: number;
  messageList: MessageModel[];
}

export default class Like extends React.Component<LikeProps, LikeState> {
  constructor(props: LikeProps) {
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
    req.get("Message", "praiseLists", {}, (response: any) => {
      console.log(response);
      if (response && response.data) {
        this.initLikePage(response.data.info);
      }
    });
  };

  initLikePage = (data: MessageModel[]) => {
    if (data.length > 0) {
      this.setState({
        messageList: data
      });
    }

    new Swiper(".swiper-container", {
      direction: "vertical",
      preloadImages: false,
      height: 60
    });
  };

  public render() {
    const emptyMsg = {
      title: `你还没有被赞哦`,
      content: ``
    };
    const containerStyle = {
      height: this.state.divHeight + "px",
      top: 60 + "px"
    };
    return (
      <>
        <header className="App-header">
          <ReturnButton /> 赞
        </header>
        {this.state.messageList.length !== 0 ? (
          <div className="swiper-container" style={containerStyle}>
            <div className="swiper-wrapper">
              {this.state.messageList.map((item, index) => {
                return (
                  <NavIconDetailCell
                    key={"swiper-slide-msg" + index}
                    index={index}
                    toLink={"/"}
                    avatarSrc={item.avatar}
                    otherUser={item.user_nicename ? item.user_nicename : "null"}
                    content="赞了您的作品"
                    addtime={item.addtime}
                    video_thumb={item.video_thumb}
                    videoid={item.videoid}
                    hasVideoThumb={true}
                    fromPage="like"
                    onClick={() => {}}
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
