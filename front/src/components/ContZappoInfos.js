import React, { Component } from "react";
import RootContainer from "../styled/RootContainer";
import MainHeader from "./MainHeader";
import imageOpen from "../assets/img/thumbRestOpen.jpg";
import ZappoMap from "./ZappoMapComponents/ZappoMap";
import FooterZappoMap from "./ZappoMapComponents/FooterZappoMap";

class ContZappoInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { history } = this.props;
    return (
      <div>
        <RootContainer>
          <MainHeader
            image={imageOpen}
            pageTitle="RESTAURANT"
            subTitle="Horaires et adresse"
            redirect={() => history.goBack()}
          />
          <ZappoMap />
          <FooterZappoMap />
        </RootContainer>
      </div>
    );
  }
}
export default ContZappoInfos;
