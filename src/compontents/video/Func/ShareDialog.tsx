import * as React from "react";

import ReturnButton from "../../base/ReturnButton";

interface ShareDialogProps {
  className?: string;
  vid: string;
  isLogin: boolean;
  onClose: Function;
}

interface ShareDialogState {
  className: string;
}
export default class ShareDialog extends React.Component<
  ShareDialogProps,
  ShareDialogState
> {
  constructor(props: ShareDialogProps) {
    super(props);
    this.state = {
      className: "dialog share-slide"
    };
  }

  onClose = () => {
    this.setState({
      className: "dialog dialog-close share-slide"
    });
    this.props.onClose();
  };

  handleSubmit = () => {};

  public render() {
    return (
      <div className={this.state.className}>
        <ReturnButton onClick={this.onClose} isClose={true} />
      </div>
    );
  }
}
