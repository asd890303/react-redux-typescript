import "../../styles/follow/follow.css";

import * as React from "react";
import Swiper from "swiper";

import FollowCell from "./FollowCell";
import Request from "../../services/request";
import VideoModel from "../../models/api/video";

interface FollowProps {}

interface FollowState {
  videoList: VideoModel[];
}

export default class Follow extends React.Component<FollowProps, FollowState> {
  constructor(props: FollowProps) {
    super(props);

    this.state = {
      videoList: []
    };
  }

  componentDidMount = () => {
    this.getVideoList();
  };

  getVideoList = () => {
    Request.get("Video", "getVideoList", { param: "test" }, (response: any) => {
      console.log(response);
      if (response && response.data) {
        this.initFollowPage(response.data.info);
      }
    });
  };

  initFollowPage = (data: VideoModel[]) => {
    if (data.length > 0) {
      this.setState({
        videoList: data
      });
    }

    new Swiper(".swiper-container", {
      direction: "vertical",
      preloadImages: false,
      lazy: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      } ,
      slidesPerView: 4,
      observer: true,
      observeParents: true
    });
  };

  public render() {
    const emptyMsg = {
      title: `关注列表为空`,
      content: `你关注的人的作品都会放到这里哦`
    };

    if (this.state.videoList.length !== 0) {
      let cell = this.state.videoList.map(video => {
        return (
          <FollowCell
            key={"swiper-cell-" + video.id}
            id={video.uid}
            title={video.title}
            href={video.href}
            thumb={video.thumb_s}
            avatar={video.thumb_s}
            name={video.id}
          />
        );
      });
      return (
        <>
          <div className="swiper-container">
            <div className="swiper-wrapper">{cell}</div>
          </div>
          ;
        </>
      );
    } else {
      return (
        <>
          <div>{emptyMsg.title}</div>
          <div>{emptyMsg.content}</div>
        </>
      );
    }
  }
}
