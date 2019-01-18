import React, { Component } from "react";
import ImageAvatars from "./ImageAvatars";
//MATERIAL-UI COMPONENTS
import { ChevronLeft } from "@material-ui/icons";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";

//ASSETS

//STYLED COMPONENTS
import { AvatarBig, BackButtonWrapper } from "../styled/Index";

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <BackButtonWrapper>
            <IconButton color="inherit" aria-label="Menu">
              <ChevronLeft />
            </IconButton>
          </BackButtonWrapper>
          <Typography
            style={{ marginLeft: -12 }}
            variant="title"
            color="inherit"
          >
            Retour
          </Typography>
        </Toolbar>
        <Toolbar style={{ paddingBottom: "17px" }}>
          <Grid container>
            <Grid>
              <AvatarBig>
                <ImageAvatars
                  titleAvatars={this.props.pageTitle}
                  imageAvatars={this.props.image}
                />
              </AvatarBig>
            </Grid>
            <Grid style={{ paddingTop: 10 }}>
              <Typography color="inherit" variant="display4">
                {this.props.pageTitle}
              </Typography>
              <Typography color="inherit" variant="subheading">
                {this.props.subTitle}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MainHeader;
