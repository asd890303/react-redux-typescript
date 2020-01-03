import * as React from "react";

interface MarqueeProp {
  text: string;
}

export default class Marquee extends React.Component<MarqueeProp> {
  public render() {
    return (
      <div
        className="marquee"
        dangerouslySetInnerHTML={{ __html: this.props.text }}
      ></div>
    );
  }
}
