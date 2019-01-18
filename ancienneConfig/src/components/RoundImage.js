import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import thumbShoppingCart from "../assets/thumbShoppingCart.jpg";

const styles = theme => ({
  size: {
    width: 80,
    height: 80,
    borderRadius: "50%"
  }
});

function RoundImage(props) {
  const { classes } = props;
  return (
    <div className={classes.size}>
      <Avatar alt="avatar" src={thumbShoppingCart} />
    </div>
  );
}

RoundImage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoundImage);
