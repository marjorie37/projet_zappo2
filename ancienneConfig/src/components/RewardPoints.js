import React, { Component } from "react";
import { Star } from "@material-ui/icons";

class RewardPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 6
    };
  }

  render() {
    return (
      <div>
        <p>
          + {this.state.points} points de fidélité{" "}
          {Array(this.state.points).fill(<Star />)}
        </p>
      </div>
    );
  }
}

export default RewardPoints;
