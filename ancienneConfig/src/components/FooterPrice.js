import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import RoundButton from "./RoundButton";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: "100%"
  }
});

class FooterPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTTC: 0,
      tvaTen: 0,
      tvaTwenty: 0,
      totalHT: 0
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <RoundButton />
        <List>
          <ListItem>
            <ListItemText primary="Total TTC" />
            <ListItemText primary={this.state.totalTTC} />
          </ListItem>
          <Divider />
          <ListItem divider>
            <ListItemText primary="Dont TVA 10%" />
            <ListItemText primary={this.state.tvaTen} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dont TVA 20%" />
            <ListItemText primary={this.state.tvaTwenty} />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Total HT" />
            <ListItemText primary={this.state.totalHT} />
          </ListItem>
        </List>
      </div>
    );
  }
}

FooterPrice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FooterPrice);
