import * as React from "react";

import { EmptyMsgContainer } from "../../common/EmptyMsgContainer";
import FollowCell from "./FollowCell";
import Request from "../../lib/services/request";
import Swiper from "swiper";
import VideoModel from "../../models/api/video";

interface FollowProps {}

interface FollowState {
  videoList: VideoModel[];
  divHeight: number;
}

export default class Follow extends React.Component<FollowProps, FollowState> {
  constructor(props: FollowProps) {
    super(props);

    this.state = {
      videoList: [],
      divHeight: 0
    };
  }

  componentDidMount = () => {
    this.setState({
      divHeight: document.body.offsetHeight - 120
    });
    window.addEventListener("resize", this.handleResize);
    this.getVideoList();
  };

  handleResize = () =>
    this.setState({
      divHeight: document.body.offsetHeight - 120
    });

  getVideoList = () => {
    let req = new Request();
    req.get(
      "Video",
      "getAttentionVideo",
      { param: "test" },
      (response: any) => {
        console.log(response);
        if (response && response.data) {
          this.initFollowPage(response.data.info);
        }
      }
    );
  };

  initFollowPage = (data: VideoModel[]) => {
    if (data && data.length > 0) {
      this.setState({
        videoList: data
      });
    }

    new Swiper(".swiper-container", {
      direction: "vertical",
      slidesPerColumn: 2,
      slidesPerView: 2,
      spaceBetween: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },

      preloadImages: false,
      lazy: true,
      observer: true,
      observeParents: true
    });
  };

  public render() {
    const emptyMsg = {
      title: `关注列表为空`,
      content: `你关注的人的作品都会放到这里哦`
    };

    const containerStyle = {
      height: this.state.divHeight + "px",
      top: 60 + "px"
    };

    if (this.state.videoList.length !== 0) {
      return (
        <div className="swiper-container" style={containerStyle}>
          <div className="swiper-wrapper">
            {this.state.videoList.map(video => {
              return (
                <FollowCell
                  key={"swiper-cell-" + video.id}
                  id={video.uid}
                  {...video}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <EmptyMsgContainer style={containerStyle}>
          <div>
            <strong>{emptyMsg.title}</strong>
          </div>
          <div>{emptyMsg.content}</div>
        </EmptyMsgContainer>
      );
    }
  }
}
