import React, { Component } from "react";
//import PropTypes from "prop-types";
// MATERIAL UI
import {
  Grid,
  withStyles,
  Input,
  InputLabel,
  FormControl,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Paper
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import config from "../../assets/lib/axiosConfig";
import axios from "axios";
import { withRouter } from "react-router";

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

class UserModifyPassRecover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      inputConfirmPassword: "",
      token: this.props.match.params.token
    };
  }

  handleClickShowPassword(e) {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleClickShowPasswordBis(e) {
    this.setState(state => ({ showPasswordBis: !state.showPasswordBis }));
  }

  handleSubmit = event => {
    event.preventDefault();
    axios(config(this.state, "/modify-motdepasseperdu", "POST")).then(res => {
      const { success, token, error } = res.data;
      if (error) {
        this.setState({ message: error });
      }
      if (success) {
        localStorage.setItem("ZappoToken", token);
        this.props.history.push("/");
      }
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    let errorMdp = "";
    let conferrorMdp = "";
    const regex1 = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$"
    );

    if (this.state.password.length >= 1) {
      errorMdp = regex1.test(this.state.password)
        ? ""
        : "votre mot de passe doit contenir 8 caractères dont un chiffre et une majuscule";
    }

    if (this.state.password.length >= 1) {
      conferrorMdp =
        this.state.inputConfirmPassword === this.state.password
          ? ""
          : "Veillez confirmer votre mot de passe";
    }

    let valid = true;

    if (!conferrorMdp.length && !errorMdp.length) {
      valid = false;
    }

    return (
      <div style={{ width: "100%" }}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Paper
              style={{ padding: "1.6rem 1rem 2rem 1rem", marginTop: "10rem" }}
            >
              <Typography variant="subheading" color="primary" align="center">
                Entrez le nouveau mot de passe
              </Typography>
              <form
                onChange={e => this.handleChange(e)}
                onSubmit={event => this.handleSubmit(event)}
              >
                <FormControl
                  style={{ marginBottom: "2rem" }}
                  className={classes.formControl}
                  error={errorMdp.length}
                >
                  <InputLabel htmlFor="password">Mot de passe</InputLabel>
                  <Input
                    id="password"
                    name="password"
                    type={this.state.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={e => this.handleClickShowPassword(e)}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errorMdp !== "" ? (
                    <div style={{ color: "red" }}>{errorMdp}</div>
                  ) : null}
                </FormControl>
                <FormControl
                  style={{ marginBottom: "2rem" }}
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="inputConfirmPassword">
                    Confirmez votre mot de passe
                  </InputLabel>
                  <Input
                    id="inputConfirmPassword"
                    name="password"
                    type={this.state.showPasswordBis ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={e => this.handleClickShowPasswordBis(e)}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {conferrorMdp !== "" ? (
                    <div style={{ color: "red" }}>{conferrorMdp}</div>
                  ) : null}
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth={true}
                  color="secondary"
                  className={classes.button}
                  disabled={valid}
                >
                  Valider
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(UserModifyPassRecover));
