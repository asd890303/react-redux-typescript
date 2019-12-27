import * as React from "react";

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

  componentDidMount = () => {
    // this.getVideoList();
  };

  public render() {
    return <div className="swiper-wrapper">Nearby</div>;
  }
}
