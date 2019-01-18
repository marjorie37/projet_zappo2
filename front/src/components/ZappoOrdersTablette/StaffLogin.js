import React, { Component } from "react";
import axios from "axios";
import {
  Grid,
  Input,
  FormControl,
  Button,
  InputLabel,
  withStyles,
  Snackbar,
  Fade
} from "@material-ui/core";
import config from "../../assets/lib/axiosOrders";
import LogoZappo from "../../assets/img/zappoLogoSmall.png";
import {
  StyledOrdersImage,
  StyledOrdersBackground,
  StyledOrdersPaper
} from "../../styled/StyledOrdersLogin";
import OrderNavButton from "./OrderNavButton";
import RootContainer from '../../styled/RootContainer';

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 5,
    display: "flex"
  }
});

class StaffLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      touched: false,
      message: null,
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      touched: true
    });
  }
  handleSubmit(e) {
    const { name, password } = this.state;
    e.preventDefault();
    axios(
      config(
        {
          name,
          password
        },
        "/connexion",
        "post"
      )
    ).then(res => {
      const { success, error, token } = res.data;
      if (success) {
        localStorage.setItem("staffToken", token);
        this.props.history.push("/zappo/orders");
      }
      if (error) {
        this.setState({ message: error});
      }
    });
  }

  render() {
    
    const { classes } = this.props;
    let errorName ="";
    let condition = true;


    if (this.state.touched) {
      errorName = this.state.name.length >= 3 ? ""
                        : "Votre pseudo n'est pas valide";


      if (!errorName.length && this.state.password.length >= 6) {
        condition = false;
      }
    }

    return (
      <RootContainer>
        <StyledOrdersBackground>
          <OrderNavButton hiddenDelay="true" user={null} />
          <Grid container justify="center">
            <Grid item xs={10}>
              <StyledOrdersPaper>
                <Grid container>
                  <Grid item xs />
                  <StyledOrdersImage src={LogoZappo} />
                  <Grid item xs />
                </Grid>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="staffName">Votre nom : </InputLabel>
                    <Input id="staffName" type="text" name="name" required />
                    {errorName !== "" ? (
                      <div style={{ color: "red" }}>{errorName}</div>
                    ) : null}
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="staffPassword">
                      Votre mot de passe :
                    </InputLabel>
                    <Input
                      id="staffPassword"
                      type="password"
                      name="password"
                      required
                    />
                  </FormControl>

                  <div style={{ margin: "0 2.4rem" }}>
                    <Button
                      style={{ marginTop: "2rem" }}
                      variant="contained"
                      fullWidth={true}
                      color="secondary"
                      type="submit"
                      disabled={condition}
                    >
                      Valider
                    </Button>
                  </div>
                </form>
              </StyledOrdersPaper>
            </Grid>
          </Grid>
        </StyledOrdersBackground>
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
      </RootContainer>
    );
  }
}

export default withStyles(styles)(StaffLogin);
