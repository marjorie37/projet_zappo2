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
  Button,
  Paper,
  Snackbar,
  Fade
} from "@material-ui/core";
import validator from "validator";
import config from "../../assets/lib/axiosConfig";
import axios from "axios";

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

class UserPassRecover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    const { history } = this.props;
    event.preventDefault();
    axios(config(this.state, "/motdepasseperdu", "POST")).then(res => {
      const { success, error } = res.data;
      if (success) {
        history.push("/identification/connexion");
      }
      if (error) {
        this.setState({ message: error });
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
    let error = "";
    let valid = true;
    if (this.state.email.length >= 1) {
      error = validator.isEmail(this.state.email)
        ? ""
        : "Votre email n'est pas valide";
      !error.length ? (valid = false) : (valid = true);
    }
    return (
      <div style={{ width: "100%" }}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Paper
              style={{
                padding: "1.6rem 1rem 2rem 1rem",
                marginTop: "10rem"
              }}
            >
              <Typography variant="subheading" color="primary" align="center">
                Entrez l'adresse
                <br />
                de votre compte Zappo
              </Typography>
              <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <FormControl
                  style={{ marginBottom: "2rem" }}
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" name="email" type="email" />
                  {error !== "" ? (
                    <div style={{ color: " red" }}>{error}</div>
                  ) : (
                    ""
                  )}
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
        <Snackbar
          open={this.state.message !== null ? true : false}
          autoHideDuration={3000}
          onClose={() => this.setState({ message: null })}
          TransitionComponent={Fade}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
      </div>
    );
  }
}

// UserPassRecover.propTypes = {
//   classes: PropTypes.object.isRequired
//};

export default withStyles(styles)(UserPassRecover);
