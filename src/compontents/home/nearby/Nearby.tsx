import * as React from "react";

import Request from "../../../lib/services/request";
import Swiper from "swiper";
import VideoCell from "../../base/VideoCell";
import VideoModel from "../../../models/api/video";

interface NearbyProps {}
interface NearbyState {
  videoList: VideoModel[];
}
export default class Nearby extends React.Component<NearbyProps, NearbyState> {
  constructor(props: NearbyProps) {
    super(props);

    this.state = {
      videoList: []
    };
  }
  swiper: any = null;

  componentDidMount = () => {
    this.initHotPage();
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
      this.swiper.slideTo(1);
    }
  };

  getVideoList = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(postition => {
        let lat = postition.coords.latitude;
        let lng = postition.coords.longitude;
        let req = new Request();
        req.get(
          "Video",
          "getNearby",
          { lat: String(lat), lng: String(lng) },
          (response: any) => {
            console.log(response);
            if (response && response.data) {
              let data: VideoModel[] = response.data.info;
              this.setState({
                videoList: data
              });

              if (this.swiper) {
                this.swiper.update();
              }
            }
          }
        );
      });
    }
  };

  initHotPage = () => {
    let swiper = new Swiper(".swiper-container", {
      direction: "vertical",
      lazy: { loadOnTransitionStart: true, loadPrevNext: true },
      observeParents: true,
      observer: true,
      preloadImages: false,
      slidesPerColumn: 2,
      slidesPerView: 2,
      spaceBetween: 1,
      watchSlidesVisibility: true
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
    const width = document.body.clientWidth / 2;

    return (
      <div className="swiper-wrapper">
        {this.state.videoList.map((video, index) => {
          return (
            <VideoCell
              enableClick={true}
              hasFuncSlide={false}
              hasVideo={false}
              width={width}
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
