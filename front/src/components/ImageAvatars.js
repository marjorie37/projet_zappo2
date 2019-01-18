import React from "react";
// import PropTypes from "prop-types";
import classNames from "classnames";

// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  // avatar: {
  //   marginRight: 10
  // },
  bigAvatar: {
    width: 70,
    height: 70
  }
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt={props.titleAvatars}
        src={props.imageAvatars}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

// ImageAvatars.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(ImageAvatars);
