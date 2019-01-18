import React, { Component } from "react";
//import PropTypes from "prop-types";
// MATERIAL UI
import {
  Grid,
  withStyles,
  Input,
  FormControl,
  Typography,
  Button
} from "@material-ui/core";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";
import { withRouter } from "react-router";
import AlertDialogSlide from "./AlertDeleteUser";
import validator from "validator";

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

class UserModifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "",
      inputPhone: "",
      inputEmail: "",
      user: {
        name: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  componentDidMount() {
    axios(config({}, `/moncompte/modifier/${this.props.user.id}`, "get")).then(
      res => {
        this.inputName.value = res.data.name;
        this.inputEmail.value = res.data.email;
        this.inputPhone.value = res.data.phone;
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    axios(
      config(
        {
          name: this.inputName.value,
          email: this.inputEmail.value,
          phone: this.inputPhone.value
        },
        `/moncompte/modifier/${this.props.user.id}`,
        "post"
      )
    ).then(res => {
      this.props.history.push(`/compte/${this.props.user.id}`);
    });
  }

  render() {
    const { classes } = this.props;
    let errorName = "";
    let errorEmail = "";
    let errorPhone = "";
    let condition = true;

    // error nom
    if (this.state.inputName.length >= 1) {
      errorName =
        this.state.inputName.length < 3 ? "votre nom est trop court" : "";
    }

    // error email
    if (this.state.inputEmail.length >= 1) {
      errorEmail = validator.isEmail(this.state.inputEmail)
        ? ""
        : "Votre email n'est pas valide";
    }

    // error tel

    if (this.state.inputPhone.length >= 1) {
      errorPhone = validator.isMobilePhone(this.state.inputPhone, "fr-FR")
        ? ""
        : "Votre numéro est incorrect";
    }

    if (!errorPhone.length && !errorEmail.length && !errorName.length) {
      condition = false;
    }

    return (
      <div style={{ width: "100%" }}>
        <Grid container justify="center">
          <Grid style={{ background: "white", padding: "4%" }} item xs={10}>
            <Typography
              variant="subheading"
              color="primary"
              align="center"
              style={{ marginTop: "1.6rem", marginBottom: "0.7rem" }}
            >
              Modification de compte Zappo
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <FormControl className={classes.formControl}>
                <Input
                  inputRef={input => (this.inputName = input)}
                  id="inputName"
                  type="text"
                  onChange={this.handleChange}
                  required
                />
                {errorName !== "" ? (
                  <div style={{ color: "red" }}>{errorName}</div>
                ) : null}
              </FormControl>
              <FormControl
                error={errorEmail.length}
                className={classes.formControl}
              >
                <Input
                  inputRef={input => (this.inputEmail = input)}
                  id="inputEmail"
                  type="email"
                  onChange={this.handleChange}
                  required
                />
                {errorEmail !== "" ? (
                  <div style={{ color: "red" }}>{errorEmail}</div>
                ) : null}
              </FormControl>
              <FormControl
                className={classes.formControl}
                error={errorPhone.length}
              >
                <Input
                  inputRef={input => (this.inputPhone = input)}
                  required
                  id="inputPhone"
                  onChange={this.handleChange}
                  type="tel"
                />
                {errorPhone !== "" ? (
                  <div style={{ color: "red" }}>{errorPhone}</div>
                ) : null}
              </FormControl>

              <Button
                variant="contained"
                fullWidth={true}
                color="secondary"
                style={{ marginBottom: "4rem", marginTop: "2em" }}
                className={classes.button}
                type="submit"
                disabled={condition}
              >
                Valider vos modifications
              </Button>
            </form>

            <Typography variant="body2" component="a" align="center">
              <AlertDialogSlide user={this.props} classes={classes} />
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// UserModifyAccount.propTypes = {
//   classes: PropTypes.object.isRequired
//};

export default withRouter(
  withStyles(styles, { withTheme: true })(UserModifyAccount)
);
