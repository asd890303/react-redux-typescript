import * as React from "react";

import Request from "../../../lib/services/request";
import Swiper from "swiper";
import VideoCell from "../../base/VideoCell";
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
  swiper: any = null;

  componentDidMount = () => {
    this.initRecommendPage();
    this.getVideoList();
  };

  componentWillUnmount = () => {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }
  };

  componentDidUpdate = () => {
    if (this.swiper) {
      this.swiper.update();
    }
  };

  getVideoList = () => {
    //getVideoList getRecommendVideos ?
    let req = new Request();
    req.get("Video", "getVideoList", { p: "1" }, (response: any) => {
      console.log(response);
      if (response && response.data) {
        let data: VideoModel[] = response.data.info;
        this.setState({
          videoList: data
        });

        if (this.swiper) {
          let thumb: any = document.getElementsByClassName(
            "swiper-slide-video-thumb-0"
          );
          if (thumb && thumb.length > 0) thumb[0].hidden = true;
          this.swiper.update();
        }
      }
    });
  };

  initRecommendPage = () => {
    let swiper = new Swiper(".swiper-container", {
      direction: "vertical",
      lazy: {
        loadPrevNextAmount: 4,
        loadPrevNext: true,
        loadOnTransitionStart: true
      },
      observeParents: true,
      observer: true,
      preloadImages: false,
      watchSlidesVisibility: true
    });

    function stopAllVideo() {
      let vids: HTMLCollectionOf<HTMLVideoElement> = document.getElementsByTagName(
        "video"
      );

      for (var i = 0; i < vids.length; i++) {
        vids[i].pause();
        vids[i].currentTime = 0;
      }
    }

    function playCurrentVideo(id: number) {
      let vids: any = document.getElementsByClassName(
        "swiper-slide-video-" + id
      );
      let thumbs: any = document.getElementsByClassName(
        "swiper-slide-video-thumb-" + id
      );

      if (vids && vids.length) {
        let vid: any = vids[0];
        if (vid.paused) {
          vid.hidden = false;
          let playPromise = vid.play();

          if (playPromise !== undefined) {
            playPromise
              .then(function() {})
              .catch(function(error: any) {
                console.log(error);
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
              });
          }
        }
        if (thumbs) thumbs[0].hidden = true;
      }
    }

    swiper.on("touchStart", () => {
      stopAllVideo();
    });

    swiper.on("touchEnd", () => {
      playCurrentVideo(swiper.activeIndex);
    });

    swiper.on("slideChangeTransitionStart", () => {
      stopAllVideo();

      let thumb: any = document.getElementsByClassName(
        "swiper-slide-video-thumb-" + swiper.activeIndex
      )[0];
      if (thumb) thumb.hidden = false;
    });

    swiper.on("slideChangeTransitionEnd", () => {
      playCurrentVideo(swiper.activeIndex);
    });

    swiper.on("resize", () => {
      swiper.update();
    });
    window.addEventListener("resize", () => {
      swiper.update();
    });

    this.swiper = swiper;
  };

  public render() {
    return (
      <div className="swiper-wrapper">
        {this.state.videoList.map((video, index) => {
          return (
            <VideoCell
              autoplay={index === 0 && true}
              fontSize={18}
              hasFuncSlide={true}
              index={index}
              key={"swiper-slide-video-" + index}
              {...video}
            />
          );
        })}
      </div>
    );
  }
}
