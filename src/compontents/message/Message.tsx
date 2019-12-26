import * as React from "react";

interface MessageProps {}

export default class Message extends React.Component<MessageProps, any> {
  // constructor(props: MessageProps) {
  //   super(props);
  // }

  componentDidMount = () => {};

  public render() {
    const text = "Message";
    return (
      <>
        <div>{text}</div>
        <div></div>
      </>
    );
  }
}
