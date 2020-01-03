import * as React from "react";

import Request from "../../lib/services/request";
import ReturnButton from "../base/ReturnButton";
import { RouteComponentProps } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  color: white;
`;

interface MatchParams {
  name: string;
  mid: string;
}

interface MessageDetailInfoProps extends RouteComponentProps<MatchParams> {}

interface MessageDetailInfoState {
  title: string;
  innerHTML: string;
  divHeight: number;
}

export default class NavIconCell extends React.Component<
  MessageDetailInfoProps,
  MessageDetailInfoState
> {
  constructor(props: MessageDetailInfoProps) {
    super(props);

    this.state = {
      title: "",
      innerHTML: "",
      divHeight: 0
    };
  }

  componentDidMount() {
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });
    window.addEventListener("resize", this.handleResize);
    this.getMessageList();
  }

  handleResize = () =>
    this.setState({
      divHeight: document.body.offsetHeight - 60
    });

  getMessageList = () => {
    let req = new Request();
    req.get(
      "Message",
      this.props.match.params.name === "official"
        ? "officialLists"
        : "systemnotifyLists",
      {},
      (response: any) => {
        let tempObj: Object = {};
        console.log(response);
        if (response && response.data) {
          if (response.data.info && response.data.info.length > 0) {
            tempObj = response.data.info.find((item: any) => {
              return item.id === this.props.match.params.mid;
            });
            this.initMessagePage(tempObj);
          }
        }
      }
    );
  };

  initMessagePage = (data: any) => {
    if (data) {
      this.setState({
        title: data.title,
        innerHTML: data.url
      });
    }
  };

  createMarkup = () => {
    const iframe = `<iframe src="${
      this.state.innerHTML
    }" width="100%" height= "${this.state.divHeight -
      10}"  style = "border: none"></iframe>`;
    return {
      __html: iframe
    };
  };

  public render() {
    const containerStyle = {
      height: this.state.divHeight + "px",
      top: 60 + "px"
    };
    return (
      <>
        <header className="App-header">
          <ReturnButton /> {this.state.title}
        </header>
        <Container style={containerStyle}>
          <div dangerouslySetInnerHTML={this.createMarkup()}></div>
        </Container>
      </>
    );
  }
}
