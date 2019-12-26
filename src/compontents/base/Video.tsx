import * as React from "react";

import VideoModel from "../../models/api/video";

interface VideoProps extends VideoModel {
  className?: string;
  vid: number;
  onClick?: Function;
}
export default class Video extends React.Component<VideoProps> {
  // constructor(props: HomeProps) {
  //   super(props);
  // }

  componentDidMount = () => {};

  handleClick = () => {
    this.props.onClick && this.props.onClick();
  };

  public render() {
    const { title, thumb, href, userinfo, className } = this.props;
    const divClassName = className
      ? className + "swiper-slide"
      : "swiper-slide";
    return (
      <div className={divClassName} onClick={this.handleClick}>
        <img
          className={
            "swiper-slide-video-thumb swiper-slide-video-thumb-" +
            this.props.vid
          }
          alt={title}
          src={thumb}
        ></img>
        <video
          className={"swiper-slide-video swiper-slide-video-" + this.props.vid}
          loop
          hidden
        >
          <source src={href} type="video/mp4"></source>
        </video>
        <div className="swiper-slide-content">
          @{userinfo.user_nicename}
          <br />
          {title}
        </div>
        <div className="swiper-lazy-preloader"></div>
      </div>
    );
  }
}
