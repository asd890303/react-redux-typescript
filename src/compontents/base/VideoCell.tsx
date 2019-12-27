import * as React from "react";

import VideoCellFunc from "./VideoCellFunc";
import VideoModel from "../../models/api/video";

interface VideoCellProps extends VideoModel {
  hasVideo?: boolean;
  hasFuncSlide?: boolean;
  className?: string;
  height?: number;
  fontSize?: number;
  width?: number;
  vid: number;
  onClick?: Function;
}
export default class VideoCell extends React.Component<VideoCellProps> {
  public static defaultProps = {
    hasVideo: true,
    hasFuncSlide: true
  };

  componentDidMount = () => {};

  handleClick = () => {
    this.props.onClick && this.props.onClick();
  };

  renderFuncView = () => {
    if (!this.props.hasFuncSlide) {
      return;
    }

    let funcList = [
      {
        name: "follow",
        avatarSrc: this.props.userinfo.avatar_thumb,
        imgSrc: process.env.PUBLIC_URL + "/images/home/home_follow.png",
        imgSrcSelected:
          process.env.PUBLIC_URL + "/images/home/home_follow_sel.png",
        selected: Boolean(this.props.isattent),
        num: NaN,
        onClick: () => {
          console.log("follow");
        }
      },
      {
        name: "like",
        imgSrc: process.env.PUBLIC_URL + "/images/home/home_zan.png",
        imgSrcSelected:
          process.env.PUBLIC_URL + "/images/home/home_zen_sel.png",
        selected: Boolean(this.props.islike),
        num: Number(this.props.likes),
        onClick: () => {
          console.log("like");
        }
      },
      {
        name: "comment",
        imgSrc: process.env.PUBLIC_URL + "/images/home/home_comment.png",
        selected: false,
        num: Number(this.props.comments),
        onClick: () => {
          console.log("comment");
        }
      },
      {
        name: "share",
        imgSrc: process.env.PUBLIC_URL + "/images/home/home_share.png",
        selected: false,
        num: Number(this.props.shares),
        onClick: () => {
          console.log("share");
        }
      },
      {
        name: "gift",
        imgSrc: process.env.PUBLIC_URL + "/images/home/home_gift.png",
        selected: false,
        num: NaN,
        onClick: () => {
          console.log("gift");
        }
      },
      {
        name: "music",
        imgSrc: process.env.PUBLIC_URL + "/images/home/music_disc.png",
        selected: false,
        num: NaN,
        onClick: () => {
          console.log("music");
        }
      }
    ];

    return <VideoCellFunc vid={this.props.id} funcList={funcList} />;
  };

  public render() {
    const {
      className,
      fontSize,
      hasVideo,
      height,
      href,
      thumb,
      title,
      userinfo,
      width
    } = this.props;

    const divClassName = className
      ? className + "swiper-slide"
      : "swiper-slide";
    const divWidth = width ? width + "px" : "100%";
    const divHeight = height ? height + "px" : "100%";
    const contentStyle: any = {};
    if (fontSize) contentStyle["fontSize"] = fontSize;

    return (
      <div
        className={divClassName}
        onClick={this.handleClick}
        style={{ width: divWidth, height: divHeight }}
      >
        <img
          className={
            "swiper-lazy swiper-slide-video-thumb swiper-slide-video-thumb-" +
            this.props.vid
          }
          alt={title}
          // src={process.env.PUBLIC_URL + "/images/common/nodata.png"}
          //  data-srcset="path/logo/logo-large.png 2x"
          data-src={thumb}
        ></img>
        {hasVideo && (
          <video
            className={
              "swiper-slide-video swiper-slide-video-" + this.props.vid
            }
            loop
            hidden
          >
            <source src={href} type="video/mp4"></source>
          </video>
        )}
        <div className="swiper-slide-content" style={contentStyle}>
          <span style={{ fontSize: "larger" }}>@{userinfo.user_nicename}</span>
          <br />
          {title}
        </div>
        {this.renderFuncView()}
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
    );
  }
}
