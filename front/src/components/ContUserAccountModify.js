import React, { Component } from "react";

// HomeMade Components
import { RootContainer } from "../styled/Index";
import MainHeader from "./MainHeader";

//MATERIAL-UI COMPONENTS
import { Grid } from "@material-ui/core";

// ASSETS
import imageConnexion from "../assets/img/thumbConnexion.jpg";
import UserModifyAccount from "./UserComponents/UserModifyAccount";

class ContUserAccountModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Modification de votre compte Zappo"
    };
  }

  render() {
    const {history} = this.props;
    const { title } = this.state;
    return (
      <RootContainer>
        <MainHeader
          pageTitle="Profil"
          subTitle="Modifier mes infos"
          image={imageConnexion}
          redirect={() => history.goBack()}
        />
        <Grid container spacing={0} />
        {this.props.user && (
          <UserModifyAccount user={this.props.user} title={title} />
        )}
      </RootContainer>
    );
  }
}

export default ContUserAccountModify;
