import * as React from "react";

import { Modal } from "react-bootstrap";
import Request from "../../../lib/services/request";

interface CommentReplyProps {
  vid: string;
  handleClickInput: Function;
  handleSubmit: Function;
}

interface CommentReplyState {
  value: string;
  apiMsg: string;
  showModal: boolean;
}
export default class CommentReply extends React.Component<
  CommentReplyProps,
  CommentReplyState
> {
  constructor(props: CommentReplyProps) {
    super(props);

    this.state = {
      apiMsg: "",
      showModal: false,
      value: ""
    };
  }

  setModal = (msg: string) => {
    this.setState({
      showModal: !this.state.showModal,
      apiMsg: msg || "发生错误"
    });

    setTimeout(() => {
      this.setState({
        showModal: !this.state.showModal
      });
    }, 800);
  };

  handleClickAt = () => {};

  handleSubmit = (e: any) => {
    let form: any = document.getElementById("comment-dialog-form");
    if (form) {
      e.preventDefault();

      let req = new Request();
      req.get(
        "Video",
        "setComment",
        { videoid: this.props.vid, content: this.state.value },
        (response: any) => {
          if (response && response.data) {
            this.setModal(response.data.msg);
            this.setState({
              value: ""
            });
            this.props.handleSubmit();
          }
        }
      );
    }
  };

  handleChange = (e: any) => {
    this.setState({
      value: e.target.value
    });
  };

  public render() {
    const hasFooter = document.getElementsByClassName("App-footer").length > 0;
    const style = !hasFooter ? { bottom: 5 } : {};
    return (
      <div className="comment-reply" style={style}>
        <form
          id="comment-dialog-form"
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <input
            className="comment-input"
            onChange={e => this.handleChange(e)}
            onClick={e => {
              this.props.handleClickInput(e);
            }}
            placeholder={"说点什么"}
            value={this.state.value}
          ></input>
          <span className="comment-input-at" onClick={this.handleClickAt}>
            @
          </span>
        </form>
        <Modal
          show={this.state.showModal}
          centered
          onHide={() => this.setModal("")}
        >
          <Modal.Body>
            <p style={{ textAlign: "center" }}>{this.state.apiMsg}</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
