import React, { Component } from "react";
//import MainContainer from "./MainContainer";
import {
  HomePageMainNavigation,
  HomePageSubNavigation,
  HomePageMainContent,
  HomePageItem
} from "./HomePageComponents/Index";

//ROUTING
import { Route } from "react-router-dom";

//MATERIAL-UI COMPONENTS
import { Grid, Button } from "@material-ui/core";

//STYLED COMPONENTS
import { RootContainer } from "../styled/Index";

//STATELESS COMPONENTS
import GetTitle from "../assets/lib/getTitle";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: 0
    };
    this.handleSubNavigation = this.handleSubNavigation.bind(this);
  }

  handleSubNavigation(value) {
    this.setState({
      productList: value
    });
  }
  render() {
    return (
      <RootContainer>
        <HomePageMainNavigation />
        {/* <div className={classes.root}> */}
        <Grid container spacing={0}>
          <HomePageSubNavigation
            handleSubNavigation={this.handleSubNavigation}
          />
          <HomePageMainContent value={this.state.productList} />
          {/* EXEMPLE DE SOUS ROUTE : <Route exact path="/main" component={MainContainer} /> */}
        </Grid>
        {/* </div> */}
      </RootContainer>
    );
  }
}

export default HomePage;
