import React, { Component } from "react";
import { Grid, withStyles, Typography, Paper } from "@material-ui/core";
import { RootContainer } from "../styled/Index";
import { HomePageMainNavigation } from "./HomePageComponents/Index";
import StyledLink from "../styled/StyledLink";
import EmptyCard from "./EmptyCard";
import errorPicture from "../assets/img/errorPicture.jpg";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    display: "flex"
  }
});

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <RootContainer>
          <HomePageMainNavigation user={this.props.user} />
          <Grid
            item
            style={{
              width: "100%",
              maxWidth: "700px",
              margin: "6rem auto"
            }}
          >
            <EmptyCard
              title="Erreur"
              image={errorPicture}
              comment="Oups! Une erreur est survenue lors de votre requête."
              link="/"
              buttonText="Retour à la page d'accueil"
            />
          </Grid>
        </RootContainer>
      </div>
    );
  }
}

export default withStyles(styles)(NotFound);
