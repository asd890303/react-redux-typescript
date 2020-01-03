import React from "react";
import VideoModel from "../../models/api/video";
import styled from "@emotion/styled";

interface FollowCellProps extends VideoModel {}

const SwiperSlideCell = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  width: 50%;
  color: #ffffff;

  > img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const SwiperSlideDesc = styled.div`
  width: 100%;
  text-align: left;
  margin-left: 10px;
  margin-bottom: 5px;
  z-index: 1;

  > div {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SwiperSlideAvatar = styled.div`
  display: inline-flex;
  align-items: center;

  > img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    background-color: #ffffff;
    border-radius: 50%;
  }
`;

export default class FollowCell extends React.Component<FollowCellProps> {
  componentDidMount() {}

  handleClick = () => {
    // to do 跳轉頁面 & API
  };

  public render() {
    const { title, thumb, userinfo } = this.props;

    return (
      <SwiperSlideCell className="swiper-slide">
        <img src={thumb} alt={title} />
        <SwiperSlideDesc>
          <div>{title}</div>
          <SwiperSlideAvatar>
            <img src={userinfo.avatar_thumb} alt={title} />
            <p>{userinfo.user_nicename}</p>
          </SwiperSlideAvatar>
        </SwiperSlideDesc>
        <div className="swiper-lazy-preloader"></div>
      </SwiperSlideCell>
    );
  }
}
