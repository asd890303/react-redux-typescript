import * as React from "react";

interface FuncList {
  avatarSrc?: string;
  imgSrc: string;
  imgSrcSelected?: string;
  name: string;
  num: number;
  selected: boolean;
  onClick: Function;
}

interface VideoCellFuncProps {
  vid: string;
  funcList: FuncList[];
}

export default class VideoCellFunc extends React.Component<VideoCellFuncProps> {
  componentDidMount = () => {};

  public render() {
    return (
      <div className="swiper-slide-func">
        {this.props.funcList.map((item, index) => {
          return (
            <div
              className="swiper-slide-func-content"
              key={"slide-func-" + index}
              onClick={() => {
                item.onClick(this.props.vid);
              }}
            >
              {index === 0 ? (
                <div className="func-content-user">
                  <img src={item.avatarSrc} alt={item.name}></img>
                  {!item.selected && (
                    <img src={item.imgSrc} alt={item.name}></img>
                  )}
                </div>
              ) : (
                <>
                  <img
                    src={item.selected ? item.imgSrcSelected : item.imgSrc}
                    alt={item.name}
                  ></img>
                  <span>{item.num >= 0 ? item.num : ""}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
