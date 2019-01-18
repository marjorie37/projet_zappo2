import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Payment } from "@material-ui/icons";

class RoundButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goToPayment = this.goToPayment.bind(this);
  }

  goToPayment() {

  }
  render() {
    return (
      <div>
        <Button variant="fab" color="secondary" onClick={this.goToPayment}>
          <Payment />
        </Button>
      </div>
    );
  }
}

export default RoundButton;
