import React, { Component } from "react";
import StaffLogin from "./StaffLogin";


class ContStaffLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if(this.props.user !== null) this.props.history.push('/zappo/orders')
  }


  render() {

    return (
      <StaffLogin {...this.props} />
    );
  }
}

export default ContStaffLogin;
