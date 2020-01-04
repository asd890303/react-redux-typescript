import * as React from "react";

import { Spinner } from "react-bootstrap";

interface PageLoadingProps {
  isShow: boolean;
}
export default class PageLoading extends React.Component<PageLoadingProps> {
  public render() {
    return (
      <div className="page-loading" hidden={!this.props.isShow}>
        <div className="masker" />
        <Spinner animation="border" variant="primary" style={{ zIndex: 102 }} />
      </div>
    );
  }
}
