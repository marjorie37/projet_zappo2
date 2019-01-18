import React, { Component } from "react";

//ROUTES FIRST LEVEL
import { AuthUserRoads } from "../routes";
import { userLoginRoad } from "../roads";

// HomeMade Components
import { RootContainer } from "../styled/Index";
import MainHeader from "./MainHeader";

// ASSETS
import imageConnexion from "../assets/img/thumbConnexion.jpg";

class ContUserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history, location } = this.props;
    return (
      <RootContainer>
        <MainHeader
          pageTitle="Connexion"
          subTitle="Compte Zappo"
          image={imageConnexion}
          redirect={() => history.goBack()}
        />
        <div>
          <AuthUserRoads
            prevPath={location.state ? location.state.url : null}
            {...this.props}
            roadTab={userLoginRoad}
          />
        </div>
      </RootContainer>
    );
  }
}

export default ContUserLogin;
