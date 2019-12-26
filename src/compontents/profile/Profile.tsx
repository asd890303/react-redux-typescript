import * as React from "react";

interface ProfileProps {}

export default class Profile extends React.Component<ProfileProps, any> {
  // constructor(props: ProfileProps) {
  //   super(props);
  // }

  componentDidMount = () => {};

  public render() {
    const text = "Profile";

    return (
      <>
        <div>{text}</div>
        <div></div>
      </>
    );
  }
}
