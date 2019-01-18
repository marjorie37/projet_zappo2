import React, { Component } from "react";
import PropTypes from "prop-types";
// MATERIAL UI
import {
  Grid,
  withStyles,
  Input,
  InputLabel,
  FormHelperText,
  FormControl,
  Typography,
  Button
} from "@material-ui/core";

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

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      password: ""
    };
  }

  handleChange = event => {

  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Typography
              variant="subheading"
              color="primary"
              align="center"
              style={{ marginTop: "1.6rem", marginBottom: "0.7rem" }}
            >
              Vous avez un compte Zappo
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="email-simple">Email</InputLabel>
              <Input id="email-simple" type="email" />
            </FormControl>
            <FormControl
              style={{ marginBottom: "20px" }}
              className={classes.formControl}
              aria-describedby="password-helper-text"
            >
              <InputLabel htmlFor="password-helper">Password</InputLabel>
              <Input id="name-password" type="password" />
              <Typography
                component="a"
                href="https://www.google.com"
                align="right"
                variant="caption"
                style={{ marginTop: "0.3rem", textDecoration: "none" }}
              >
                Mot de passe oublié
              </Typography>
            </FormControl>
            <Button
              variant="contained"
              fullWidth={true}
              color="secondary"
              className={classes.button}
            >
              Valider
            </Button>
          </Grid>
        </Grid>
        {/* SECTION CREER UN COMPTE */}
        <Grid container justify="center">
          <Grid item xs={10}>
            <Typography
              variant="subheading"
              color="primary"
              align="center"
              style={{ marginTop: "2.6rem", marginBottom: "0.7rem" }}
            >
              C'est votre première commande
            </Typography>
            <Button
              variant="contained"
              fullWidth={true}
              className={classes.button}
              to="/creation"
            >
              Créer un compte
            </Button>
          </Grid>
        </Grid>
        {/* SECTION COMMANDE RAPIDE */}
        <Grid container justify="center">
          <Grid item xs={10}>
            <Typography
              variant="subheading"
              color="primary"
              align="center"
              style={{ marginTop: "2.6rem", marginBottom: "0.7rem" }}
            >
              Commande sans création de compte
            </Typography>
            <Button
              variant="contained"
              fullWidth={true}
              className={classes.button}
            >
              Commande rapide
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// UserAccountLogin.propTypes = {
//   classes: PropTypes.object.isRequired
//};

export default withStyles(styles)(UserLogin);
