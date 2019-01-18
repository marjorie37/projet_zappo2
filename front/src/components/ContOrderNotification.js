import React, { Component } from "react";
import RewardPoints from "./BasketComponents/RewardPoints";
import MainHeader from "./MainHeader";
import { Typography, Divider } from "@material-ui/core";
import RootContainer from "../styled/RootContainer";
import imageOpen from "../assets/img/thumbRestOpen.jpg";
import ZappoMap from "./ZappoMapComponents/ZappoMap";
import FooterZappoMap from "./ZappoMapComponents/FooterZappoMap";
import { StyledPaper } from "../styled/StyledNotifCard";

class ContOrderNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {history} = this.props;
    return (
      <div>
        <RootContainer>
          <MainHeader
            image={imageOpen}
            pageTitle="Perfetto !"
            subTitle="Commande en validation"
            redirect={() => history.push('/')}
          />
          <ZappoMap />

          <StyledPaper
            elevation={9}
            style={{
              padding: 15,
              position: "absolute",
              left: "0",
              right: "0",
              width: "80%",
              margin: "0 auto",
              top: "62vh"
            }}
          >
            <RewardPoints />
            <Divider />
            <Typography variant="body1" component="p">
              Vous recevrez un email dès que votre commande aura été validée par
              l'un de nos pizzaioli.
            </Typography>
          </StyledPaper>
          <FooterZappoMap />
        </RootContainer>
      </div>
    );
  }
}
export default ContOrderNotification;
