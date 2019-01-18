import React, { Component } from "react";
import MainHeader from "./MainHeader";
import NotificationCard from "./NotificationCard";
import RootContainer from "../styled/RootContainer";
import refused from "../assets/img/thumbRefused.jpg";
import errorPicture from "../assets/img/errorPicture.jpg";
import { Grid } from "@material-ui/core";

class ContRefusedPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifTitle: "Oups !",
      notifText:
        "Le paiement n'est pas possible actuellement. Nous vous invitons à réessayer plus tard."
    };
  }
  render() {

    return (
      <div>
        <RootContainer>
          <MainHeader
            image={refused}
            pageTitle="Erreur"
            subTitle="Le paiement n'a pas abouti"
          />
          <Grid container style={{ padding: "10px" }} justify="center">
            <Grid item>
              <NotificationCard
                notifImage={errorPicture}
                notifTitle={this.state.notifTitle}
                notifText={this.state.notifText}
                handleBackPayment={this.handleBack}
              />
            </Grid>
          </Grid>
        </RootContainer>
      </div>
    );
  }
}

export default ContRefusedPayment;
