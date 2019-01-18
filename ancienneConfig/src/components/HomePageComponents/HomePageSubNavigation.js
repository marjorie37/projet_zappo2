import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, AppBar, Tabs, Tab } from "@material-ui/core";
//Components
import { HomePageItem } from "./Index";
import TabContainer from "../../assets/lib/TabContainer";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class HomePageSubNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
    this.props.handleSubNavigation(value);
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <AppBar position="static" color="default" elevation={12}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
        >
          <Tab label="Suggestions" />
          <Tab label="Entrées" />
          <Tab label="Pizze" />
          <Tab label="Desserts" />
          <Tab label="Boissons" />
        </Tabs>
      </AppBar>
    );
  }
}

// HomePageSubNavigation.propTypes = {
//   classes: PropTypes.object.isRequired,
//   handleSubNavigation: PropTypes.func.isRequired
// };

export default withStyles(styles)(HomePageSubNavigation);
