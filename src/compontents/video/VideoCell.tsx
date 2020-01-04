import * as React from "react";

import CommentDialog from "./Func/CommentDialog";
import { NavLink } from "react-router-dom";
import Request from "../../lib/services/request";
import ShareDialog from "./Func/ShareDialog";
import VideoCellFunc from "./VideoCellFunc";
import VideoModel from "../../models/api/video";

interface VideoCellProps extends VideoModel {
  autoplay?: boolean;
  className?: string;
  enableClick?: boolean;
  fontSize?: number;
  hasFuncSlide?: boolean;
  hasVideo?: boolean;
  height?: number;
  hiddenThumb?: boolean;
  index: number;
  width?: number;
  isLogin: boolean;
  updateVideoFunc?: Function;
  onClick?: Function;
}

interface VideoCellState {
  dialog: string;
  dialogClassName: string;
  funcList: any;
}
export default class VideoCell extends React.Component<
  VideoCellProps,
  VideoCellState
> {
  public static defaultProps = {
    autoplay: false,
    hasVideo: true,
    hiddenThumb: false,
    hasFuncSlide: true
  };

  private player?: any;

  constructor(props: VideoCellProps) {
    super(props);
    this.state = {
      dialog: "",
      dialogClassName: "",
      funcList: [
        {
          name: "follow",
          avatarSrc: this.props.userinfo.avatar_thumb,
          imgSrc: process.env.PUBLIC_URL + "/images/home/home_follow.png",
          imgSrcSelected: "",
          selected: !!Number(this.props.isattent),
          num: NaN,
          onClick: (id: string) => {
            if (!!Number(this.props.isattent)) return;
            this.handleClickFollow(this.props.userinfo.id);
          }
        },
        {
          name: "like",
          imgSrc: process.env.PUBLIC_URL + "/images/home/home_zan.png",
          imgSrcSelected:
            process.env.PUBLIC_URL + "/images/home/home_zan_sel.png",
          selected: !!Number(this.props.islike),
          num: Number(this.props.likes),
          onClick: (id: string) => {
            this.handleClickLike(id);
          }
        },
        {
          name: "comment",
          imgSrc: process.env.PUBLIC_URL + "/images/home/home_comment.png",
          selected: false,
          num: Number(this.props.comments),
          onClick: () => {
            this.handlClickFunc("comment");
          }
        },
        {
          name: "share",
          imgSrc: process.env.PUBLIC_URL + "/images/home/home_share.png",
          selected: false,
          num: Number(this.props.shares),
          onClick: () => {
            this.handlClickFunc("share");
          }
        },
        {
          name: "gift",
          imgSrc: process.env.PUBLIC_URL + "/images/home/home_gift.png",
          selected: false,
          num: NaN,
          onClick: () => {
            this.handlClickFunc("gift");
          }
        },
        {
          name: "music",
          imgSrc: process.env.PUBLIC_URL + "/images/home/music_disc.png",
          selected: false,
          num: NaN,
          onClick: () => {}
        }
      ]
    };
  }

  componentDidMount = () => {
    this.player = document.getElementById(
      "swiper-slide-video-thumb-" + this.props.index
    );
  };

  componentWillUnmount() {
    if (this.player) {
      this.player.pause();
      this.player.removeAttribute("src");
      delete this.player;
    }
  }

  handlClickFunc = (target: string) => {
    this.setState({
      dialog: target
    });
  };

  handleCloseFuncDialog = () => {
    setTimeout(() => {
      this.setState({
        dialog: ""
      });
    }, 315);
  };

  handleClickFollow = (target: string) => {
    let req = new Request();
    req.get("User", "setAttent", { touid: target }, (response: any) => {
      this.setState(preState => {
        preState.funcList[0].selected = !preState.funcList[0].selected;
        return preState;
      });
    });
  };

  handleClickLike = (target: string) => {
    let req = new Request();
    req.get("Video", "addLike", { videoid: target }, (response: any) => {
      if (response && response.data) {
        this.setState(preState => {
          preState.funcList[1].selected = !preState.funcList[1].selected;
          if (response.data.info[0].islike === "1")
            preState.funcList[1].num += 1;
          else preState.funcList[1].num -= 1;
          return preState;
        });
      }
    });
  };

  handleClick = (e: any) => {
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  };

  renderFuncDialog = () => {
    switch (this.state.dialog) {
      case "comment":
        return (
          <CommentDialog
            isLogin={this.props.isLogin}
            onClose={this.handleCloseFuncDialog}
            vid={this.props.id}
          />
        );
      case "share":
        return (
          <ShareDialog
            isLogin={this.props.isLogin}
            onClose={this.handleCloseFuncDialog}
            vid={this.props.id}
          />
        );
      default:
        return;
    }
  };

  renderFuncView = () => {
    if (!this.props.hasFuncSlide) return;
    return <VideoCellFunc vid={this.props.id} funcList={this.state.funcList} />;
  };

  public render() {
    const {
      className,
      enableClick,
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
        {enableClick && (
          <NavLink
            className="video-nav-link"
            to={`/video/` + this.props.id}
          ></NavLink>
        )}
        <img
          hidden={this.props.hiddenThumb}
          className={
            "swiper-lazy swiper-slide-video-thumb swiper-slide-video-thumb-" +
            this.props.index
          }
          alt={title}
          src={process.env.PUBLIC_URL + "/images/common/video-loading.gif"}
          //  data-srcset="path/logo/logo-large.png 2x"
          data-src={thumb}
        ></img>
        {hasVideo && (
          <video
            className={
              "swiper-slide-video swiper-slide-video-" + this.props.index
            }
            autoPlay={this.props.autoplay}
            hidden={!this.props.autoplay}
            loop
            onPause={() => {}}
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
        {this.renderFuncDialog()}
        {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white" /> */}
      </div>
    );
  }
}
