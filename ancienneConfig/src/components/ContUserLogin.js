import React, { Component } from "react";

// HomeMade Components
import { RootContainer } from "../styled/Index";
import { UserLogin, UserSignUp, UserQuickOrder } from "./UserComponents/Index";
import MainHeader from "./MainHeader";

//ROUTING
import { Route } from "react-router-dom";

//MATERIAL-UI COMPONENTS
import { Grid } from "@material-ui/core";

// ASSETS
import imageConnexion from "../assets/img/thumbConnexion.jpg";

class ContUserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <RootContainer>
        <MainHeader
          pageTitle="Connexion"
          subTitle="Compte Zappo"
          image={imageConnexion}
        />
        <Grid container spacing={0} />
        <div>
          <Route path="/compte/creation" component={UserSignUp} />
        </div>
      </RootContainer>
    );
  }
}

export default ContUserLogin;
