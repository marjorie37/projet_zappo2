import React, { Component } from "react";
//import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, AppBar, Tabs, Tab } from "@material-ui/core";
//Components
import TabContainer from "../../assets/lib/TabContainer";
import HomePageItem from "./HomePageItem";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class HomePageMainContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const value = this.props.value;


    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          {value === 0 && (
            <TabContainer
              style={{
                padding: "00px 0px 00px 0px",
                background: "rgb(243, 243, 242)"
              }}
            >
              <HomePageItem />
              <HomePageItem />
            </TabContainer>
          )}
          {value === 1 && <TabContainer>Liste de pizza</TabContainer>}
          {value === 2 && <TabContainer>Liste d'entrées</TabContainer>}
          {value === 3 && <TabContainer>Liste de desserts</TabContainer>}
          {value === 4 && <TabContainer>Liste de boissons</TabContainer>}
        </Grid>
      </div>
    );
  }
}

// HomePageMainContent.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(HomePageMainContent);
