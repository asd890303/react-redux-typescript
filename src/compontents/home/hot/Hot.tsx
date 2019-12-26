import * as React from "react";

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
    // this.getVideoList();
  };

  public render() {
    return <div className="swiper-container">Hot</div>;
  }
}
