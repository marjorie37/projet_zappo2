import React, { Component } from "react";
import { Star } from "@material-ui/icons";
import { withTheme, Typography } from "@material-ui/core";
import Emitter from "../../emitter";
import { StyledReward } from "../../styled/StyledReward";

class RewardPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0
    };
    this.calculatePoint = this.calculatePoint.bind(this);
    this.emitter = Emitter;
    this.emitter.addListener("refreshCart", this.calculatePoint);
  }

  componentDidMount() {
    this.calculatePoint();
  }

  calculatePoint() {
    const tab = JSON.parse(localStorage.getItem("cart"));
    if (tab) {
      const nb = tab
        .filter(elt => elt.category_id === 1)
        .reduce((acc, elt) => acc + elt.quantity, 0);
      localStorage.setItem('fidelity',nb)
      this.setState({
        points: nb
      });
    }
  }
  render() {
    const {theme} = this.props;
    const {points} = this.state;
    return (
      <StyledReward>
        <Typography
          variant="body1"
          component="p"
          style={theme.infoColor}
        >
          [ + {points} points de fidélité
          {points >= 8
            ? "  \u{1F60A}"
            : [...Array(points)].map((point, index) => (
              <span key={ "starX" + index}>
                  <Star
                    style={{
                      marginLeft: "0.5rem",
                      fontSize: "0.8rem",
                      verticalAlign: "baseline"
                    }}
                  />
                </span>
              ))}{" "}
          ]
        </Typography>
      </StyledReward>
    );
  }
}

export default withTheme()(RewardPoints);
