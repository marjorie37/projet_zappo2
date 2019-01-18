import React, { Component } from "react";
import KeyboardArrowLeft from "@material-ui/icons";
import { Button } from "@material-ui/core";

class ButtonReturn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleReturn = this.handleReturn.bind(this);
  }

  handleReturn() {
    
  }

  render() {
    return (
      <Button onClick={this.handleReturn}>
        {/* <KeyboardArrowLeft /> */}
        <h1>Retour</h1>
      </Button>
    );
  }
}

export default ButtonReturn;
