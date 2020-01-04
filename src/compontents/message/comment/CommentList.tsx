import { EmptyMsgContainer } from "../../../common/EmptyMsgContainer";
import MessageModel from "../../../models/api/message";
import CommentListCell from "../comment/CommentListCell"
import React from "react";
import Request from "../../../lib/services/request";
import ReturnButton from "../../base/ReturnButton";
import Swiper from "swiper";

interface CommentProps {}

interface CommentState {
  divHeight: number;
  messageList: MessageModel[];
}

export default class Comment extends React.Component<
  CommentProps,
  CommentState
> {
  constructor(props: CommentProps) {
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
    req.get("Message", "commentLists", {}, (response: any) => {
      console.log(response);
      if (response && response.data) {
        this.initCommentPage(response.data.info);
      }
    });
  };

  initCommentPage = (data: MessageModel[]) => {
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
      title: `你还没有收到评论`,
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
          评论
        </header>
        {this.state.messageList.length !== 0 ? (
          <div className="swiper-container" style={containerStyle}>
            <div className="swiper-wrapper">
              {this.state.messageList.map((item, index) => {
                return (
                  <CommentListCell
                    key={"swiper-slide-msg" + index}
                    index={index}
                    toLink={"/"}
                    avatarSrc={item.avatar}
                    otherUser={item.user_nicename}
                    content="评论了你的作品"
                    comment_content={item.content}
                    video_thumb={item.video_thumb}
                    videoid={item.videoid}
                    addtime={item.addtime}
                    hasVideoThumb={true}
                    fromPage="comment"
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
