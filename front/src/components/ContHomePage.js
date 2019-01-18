import React, { Component } from "react";
import axios from "axios";
import config from "../assets/lib/axiosConfig";
import {
  HomePageMainNavigation,
  HomePageMainContent
} from "./HomePageComponents/Index";
import { Grid } from "@material-ui/core";

//STYLED COMPONENTS
import { RootContainer } from "../styled/Index";

class ContHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      favorites: [],
      animatedBadge: false
    };
  }

  componentDidMount() {
    axios(config({}, "/products", "get")).then(res => {
      this.setState({ products: res.data });
    });
  }

  render() {
    return (
      <RootContainer>
        <HomePageMainNavigation
          user={this.props.user}
          history={this.props.history}
        />
        <Grid container spacing={0}>
          <HomePageMainContent {...this.state} />
        </Grid>
      </RootContainer>
    );
  }
}

export default ContHomePage;
