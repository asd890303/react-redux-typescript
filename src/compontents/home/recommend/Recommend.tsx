import * as React from "react";

import Request from "../../../services/request";
import Swiper from "swiper";
import Video from "../../base/Video";
import VideoModel from "../../../models/api/video";

interface RecommendProps {}
interface RecommendState {
  videoList: VideoModel[];
}
export default class Recommend extends React.Component<
  RecommendProps,
  RecommendState
> {
  constructor(props: RecommendProps) {
    super(props);

    this.state = {
      videoList: []
    };
  }

  componentDidMount = () => {
    this.getVideoList();
  };

  getVideoList = () => {
    Request.get("Video", "getVideoList", {}, (response: any) => {
      console.log(response);
      if (response && response.data) {
        this.initHomePage(response.data.info);
      } else {
        console.log("no data");
      }
    });
  };

  initHomePage = (data: VideoModel[]) => {
    if (data.length > 0) {
      this.setState({
        videoList: data
      });

      let swiper = new Swiper(".swiper-container", {
        direction: "vertical",
        preloadImages: false,
        lazy: true,
        observer: true,
        observeParents: true
      });

      swiper.on("resize", () => {});
      window.addEventListener("resize", () => {
        swiper.update();
      });

      swiper.on("touchStart", () => {
        let video: any = document.getElementsByClassName(
          "swiper-slide-video-" + swiper.activeIndex
        )[0];

        if (video && video.length > 0) {
          video.pause();
        }
      });

      swiper.on("slideChangeTransitionStart", () => {
        let video: any = document.getElementsByClassName(
          "swiper-slide-video-" + swiper.activeIndex
        );
        let thumb: any = document.getElementsByClassName(
          "swiper-slide-video-thumb-" + swiper.activeIndex
        );

        if (video && video.length > 0) {
          video[0].hidden = true;
          video[0].pause();
          video[0].currentTime = 0;
        }
        if (thumb && thumb.length > 0) thumb[0].hidden = false;
      });

      swiper.on("slideChangeTransitionEnd", () => {
        let video: any = document.getElementsByClassName(
          "swiper-slide-video-" + swiper.activeIndex
        );
        let thumb: any = document.getElementsByClassName(
          "swiper-slide-video-thumb-" + swiper.activeIndex
        );

        if (video && video.length > 0) {
          video[0].hidden = false;
          video[0].play();
        }
        if (thumb && thumb.length > 0) thumb[0].hidden = true;
      });
    }

    setTimeout(() => {
      let thumb: any = document.getElementsByClassName(
        "swiper-slide-video-thumb-0"
      );

      let video: any = document.getElementsByClassName("swiper-slide-video-0");

      if (video && video.length > 0) {
        video[0].hidden = false;
        video[0].play();
      }
      if (thumb && thumb.length > 0) thumb[0].hidden = true;
    }, 1500);
  };
  public render() {
    return (
      <div className="swiper-wrapper">
        {this.state.videoList.map((video, index) => {
          return (
            <Video vid={index} key={"swiper-slide-video-" + index} {...video} />
          );
        })}
      </div>
    );
  }
}
