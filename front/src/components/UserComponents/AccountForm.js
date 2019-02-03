import React, { Component } from "react";
import validator from "validator";
// MATERIAL UI
import {
  Grid,
  Input,
  InputLabel,
  FormControl,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  withStyles,
  Snackbar,
  Fade,
  FormHelperText
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    display: "flex"
  },
  errors: {
    color: "red"
  }
});

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      userName: "",
      userEmail: "",
      userPhone: "",
      userPassword: "",
      inputConfirmPassword: "",
      touched: false,
      showPasswordBis: false
    };
  }

  handleClickShowPassword(e) {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleClickShowPasswordBis(e) {
    this.setState(state => ({ showPasswordBis: !state.showPasswordBis }));
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      touched: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      userPhone: this.state.userPhone,
      userPassword: this.state.userPassword,
      inputConfirmPassword: this.state.inputConfirmPassword
    });
    if (this.props.formType === "signin") {
      this.props.redirectTo();
    }
  }

  goToCreate() {
    this.props.history.push("/identification/creation", {
      url: this.props.prevPath
    });
  }

  render() {
    const {
      classes,
      formType,
      // onSubmit,
      onBlurCheck,
      message,
      onOpenSnack,
      onSnackClose,
      title
    } = this.props;
    const {
      userName,
      userEmail,
      userPhone,
      userPassword,
      inputConfirmPassword,
      touched
    } = this.state;
    // validations part of the component. With a condition named "noValidate" so we have different
    // validators for the login and signin parts
    let errorName = "";
    let errorEmail = "";
    let errorPhone = "";
    let errorMdp = "";
    let confErrorMdp = "";
    let noValidate = true;
    const regexPassword = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$"
    );
    const regexEmail = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );
    // validators for the signin part :
    if (formType === "signin") {
      if (userName.length >= 1) {
        errorName = userName.length < 3 ? "votre nom est trop court" : "";
      }
      if (userEmail.length >= 1) {
        errorEmail = regexEmail.test(userEmail)
          ? ""
          : "Votre email n'est pas valide";
      }
      if (userPhone.length >= 1) {
        errorPhone = validator.isMobilePhone(userPhone, "fr-FR")
          ? ""
          : "Votre numéro est incorrect";
      }
      if (userPassword.length >= 1) {
        errorMdp = regexPassword.test(userPassword)
          ? ""
          : "votre mot de passe doit contenir 8 caractères dont un chiffre et une majuscule";
      }
      if (userPassword.length >= 1) {
        confErrorMdp =
          inputConfirmPassword === userPassword
            ? ""
            : "Vos mots de passe ne sont pas identiques";
      }
      if (
        !confErrorMdp.length &&
        !errorMdp.length &&
        !errorPhone.length &&
        !errorEmail.length &&
        !errorName.length &&
        userName.length &&
        userEmail.length &&
        userPhone.length &&
        userPassword.length &&
        inputConfirmPassword.length
      ) {
        noValidate = false;
      }

      // validators for the login part
    } else if (formType === "login") {
      if (touched) {
        if (userEmail.length >= 1) {
          errorEmail = regexEmail.test(this.state.userEmail)
            ? ""
            : "Veuillez entrer votre adresse email";
        }
        if (userPassword.length < 1) {
          errorMdp = "Veuillez entrer votre mot de passe";
        }

        if (!errorMdp.length && !errorEmail.length) {
          noValidate = false;
        }
      }
    }

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Paper
              style={{
                padding: "1.6rem 1rem 2rem 1rem",
                marginTop: "3rem"
              }}
            >
              <form
                onChange={e => this.handleChange(e)}
                onBlur={onBlurCheck}
                onSubmit={e => this.handleSubmit(e)}
              >
                <Typography variant="subheading" color="primary" align="center">
                  {title}
                </Typography>
                {/* NAME */}
                {formType === "signin" && (
                  <FormControl
                    error={errorName.length}
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="name">Nom</InputLabel>
                    <Input id="userName" name="name" type="text" />
                    {errorName !== "" ? (
                      <FormHelperText className={classes.errors}>
                        {errorName}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
                {/* EMAIL */}
                <FormControl
                  error={errorEmail.length}
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="userEmail" type="email" name="email" />
                  {errorEmail !== "" ? (
                    <FormHelperText className={classes.errors}>
                      {errorEmail}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                {/* TELEPHONE */}
                {formType === "signin" && (
                  <FormControl
                    error={errorPhone.length}
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="phone">Téléphone</InputLabel>
                    <Input id="userPhone" type="tel" name="phone" />
                    {errorPhone !== "" ? (
                      <FormHelperText className={classes.errors}>
                        {errorPhone}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
                {/* PASSWORD */}
                <FormControl
                  className={classes.formControl}
                  aria-describedby="password"
                  required
                  error={errorMdp.length}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="userPassword"
                    type={this.state.showPassword ? "text" : "password"}
                    name="userPassword"
                    onChange={e => this.handleChange(e)}
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
                    <FormHelperText className={classes.errors}>
                      {errorMdp}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                {/* PASSWORD CONFIRM */}
                {formType === "signin" && this.state.userPassword.length > 0 && (
                  <FormControl
                    className={classes.formControl}
                    aria-describedby="password"
                  >
                    <InputLabel htmlFor="inputConfirmPassword">
                      Confirmer Mot de passe
                    </InputLabel>

                    <Input
                      id="inputConfirmPassword"
                      error={confErrorMdp}
                      type={this.state.showPasswordBis ? "text" : "password"}
                      name="confirmPassword"
                      onChange={e => this.handleChange(e)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={e => this.handleClickShowPasswordBis(e)}
                          >
                            {this.state.showPasswordBis ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {confErrorMdp !== "" ? (
                      <FormHelperText className={classes.errors}>
                        {confErrorMdp}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="contained"
                  fullWidth={true}
                  color="secondary"
                  className={classes.button}
                  type="submit"
                  disabled={noValidate}
                >
                  Valider
                </Button>
                {/* Part for login only */}
                {formType === "login" && (
                  <div>
                    <Typography
                      component="a"
                      href="/identification/rappel-de-mot-de-passe"
                      align="right"
                      variant="caption"
                      style={{ marginTop: "0.3rem", textDecoration: "none" }}
                    >
                      Mot de passe oublié
                    </Typography>
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
                      onClick={() => this.goToCreate()}
                    >
                      Créer un compte
                    </Button>
                  </div>
                )}
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          open={onOpenSnack}
          autoHideDuration={3000}
          onClose={onSnackClose}
          TransitionComponent={Fade}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={message}
        />
      </div>
    );
  }
}


export default withStyles(styles)(AccountForm);
