import React, { Component } from "react";
import MainHeader from "./MainHeader";
import NotificationCard from "./NotificationCard";
import RootContainer from "../styled/RootContainer";
import maintenance from "../assets/img/thumbRestClosed.jpg";
import errorPicture from "../assets/img/errorPicture.jpg";
import { Grid } from "@material-ui/core";

class ContMaintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifTitle: "Scusate !",
      notifText: "Le service de commande est indisponible.",
      suiteNotifText:
        "Zappo vous remercie de votre fidélité et vous invite à réessayer plus tard."
    };
  }
  render() {
    return (
      <div>
        <RootContainer>
          <MainHeader
            image={maintenance}
            pageTitle="Zappo"
            subTitle="Application en maintenance"
          />
          <Grid container style={{ padding: "10px" }} justify="center">
            <Grid item>
              <NotificationCard
                notifImage={errorPicture}
                notifTitle={this.state.notifTitle}
                notifText={this.state.notifText}
                suiteNotifText={this.state.suiteNotifText}
              />
            </Grid>
          </Grid>
        </RootContainer>
      </div>
    );
  }
}

export default ContMaintenance;
