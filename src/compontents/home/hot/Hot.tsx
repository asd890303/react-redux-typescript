import * as React from "react";

import Request from "../../../services/request";
import Swiper from "swiper";
import VideoCell from "../../base/VideoCell";
import VideoModel from "../../../models/api/video";

interface HotProps {}
interface HotState {
  videoList: VideoModel[];
}
export default class Hot extends React.Component<HotProps, HotState> {
  constructor(props: HotProps) {
    super(props);
    this.state = {
      videoList: []
    };
  }
  componentDidMount = () => {
    this.getVideoList();
  };

  getVideoList = () => {
    Request.get("Video", "getRecommendVideos", {}, (response: any) => {
      console.log(response);
      if (response && response.data) {
        this.initHotPage(response.data.info);
      }
    });
  };

  initHotPage = (data: VideoModel[]) => {
    if (data.length > 0) {
      this.setState({
        videoList: data
      });

      let swiper = new Swiper(".swiper-container", {
        direction: "vertical",
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 1,
        watchSlidesVisibility: true,
        preloadImages: false,
        lazy: { loadPrevNextAmount: 4, loadPrevNext: true }
      });

      // to do reload data
      swiper.on("reachBeginning", () => {});
      swiper.on("reachEnd", () => {});
    }
  };

  public render() {
    const width = document.body.clientWidth / 2;

    return (
      <div className="swiper-wrapper">
        {this.state.videoList.map((video, index) => {
          return (
            <VideoCell
              hasFuncSlide={false}
              hasVideo={false}
              width={width}
              vid={index}
              key={"swiper-slide-video-" + index}
              {...video}
            />
          );
        })}
      </div>
    );
  }
}
