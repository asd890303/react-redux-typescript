import * as React from "react";

import { AppState } from "../../lib/store";
import Request from "../../lib/services/request";
import ReturnButton from "../base/ReturnButton";
import { RouteComponentProps } from "react-router-dom";
import VideoCell from "./VideoCell";
import VideoModel from "../../models/api/video";

interface MatchParams {
  vid: string;
}
interface VideoProps extends AppState, RouteComponentProps {}
interface VideoState {
  msg: string;
  video: VideoModel | null;
}
export default class Video extends React.Component<VideoProps, VideoState> {
  constructor(props: VideoProps) {
    super(props);

    this.state = {
      msg: "",
      video: null
    };
  }

  componentDidMount = () => {
    this.updateVideoFunc();
  };

  updateVideoFunc = () => {
    let req = new Request();
    let params: any = this.props.match.params;
    req.get("Video", "getVideo", { videoid: params.vid }, (response: any) => {
      if (response && response.data && response.data.info.length > 0) {
        this.setState({
          video: response.data.info[0]
        });
      } else {
        this.setState({
          msg: response.data.msg
        });
      }
    });
  };

  public render() {
    if (this.state.video) {
      return (
        <>
          <ReturnButton />
          <VideoCell
            autoplay={true}
            fontSize={18}
            hasFuncSlide={true}
            hiddenThumb={true}
            index={0}
            updateVideoFunc={this.updateVideoFunc}
            isLogin={this.props.app.isLogin}
            {...this.state.video}
          />
        </>
      );
    } else {
      return (
        <>
          <ReturnButton />
          <div className="video-loading">
            {!this.state.msg && (
              <img
                alt="loading"
                src={
                  process.env.PUBLIC_URL + "/images/common/video-loading.gif"
                }
              ></img>
            )}
            <span>{this.state.msg}</span>
          </div>
        </>
      );
    }
  }
}
