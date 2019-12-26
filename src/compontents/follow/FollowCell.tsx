import React from "react";
import styled from "@emotion/styled";

interface FollowCellProps {
  name?: string;
  title: string;
  thumb: string;
  avatar: string;
  href: string;
  id?: string;
}

const SwiperSlideCell = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  width: 50%;
  min-height: 350px;
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
    const { name, thumb, title, avatar } = this.props;

    return (
      <SwiperSlideCell className="swiper-slide">
        <img src={thumb} alt={title} />
        <SwiperSlideDesc>
          <div>{title}</div>
          <SwiperSlideAvatar>
            <img src={avatar} alt={title} />
            <p>{name}</p>
          </SwiperSlideAvatar>
        </SwiperSlideDesc>
        {/* <div className="swiper-lazy-preloader"></div> */}
      </SwiperSlideCell>
    );
  }
}
