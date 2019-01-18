import React, { Component } from "react";
import ImageAvatars from "./ImageAvatars";

//MATERIAL-UI COMPONENTS
import { ChevronLeft } from "@material-ui/icons";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { ZappoTypography } from "../styled/Index";

//ASSETS

//STYLED COMPONENTS
import { AvatarBig, BackButtonWrapper } from "../styled/Index";

class MainHeader extends Component {
  render() {
    const { subTitle, redirect, pageTitle, image, displayDateTime } = this.props;

    return (
      <AppBar position="sticky">
        <Toolbar>
          <BackButtonWrapper onClick={redirect}>
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
          <Grid container justify="flex-start">
            <Grid item xs={3} md={1}>
              <AvatarBig>
                <ImageAvatars titleAvatars={pageTitle} imageAvatars={image} />
              </AvatarBig>
            </Grid>
            <Grid
              item
              xs={9}
              style={{ paddingTop: "10px", paddingLeft: "10px" }}
            >
              <ZappoTypography color="inherit" variant="display4">
                {pageTitle}
              </ZappoTypography>
              <Typography style={{ color: "#FFF" }} variant="subheading">
                {subTitle}
                {displayDateTime ? displayDateTime : null}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(MainHeader);
