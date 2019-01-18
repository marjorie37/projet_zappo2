import React from "react";
import { injectStripe } from "react-stripe-elements";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";
import CardSection from "./CardSection";
import {
  Grid,
  Button,
  Input,
  FormControl,
  InputLabel,
  Snackbar,
  Fade
} from "@material-ui/core";
import moment from "moment";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      message: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.stripe
      .createToken()
      .then(({ token }) => {
        axios(
          config(
            {
              token,
              cart: localStorage.getItem("cart"),
              dateOrder: localStorage.getItem("dateOrder"),
              dateNow: moment().format(),
              time: localStorage.getItem("dateTime"),
              points: localStorage.getItem("fidelity"),
              amount: Math.round(localStorage.getItem("TTC") * 100),
              amountHT: localStorage.getItem("HT"),
              comments: this.state.comments
            },
            "/payment",
            "POST"
          )
        )
          .then(res => {
            const { success, err, message } = res.data;
            if (success) {
              this.props.history.push("/buon-appetito");
            }
            if (message) {
              this.setState({ message });
            }
            if (err) {
              this.setState({ message: err });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container justify="center">
          <Grid item md={6} xs={12} style={{ margin: "20px 10px" }}>
              <CardSection />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            style={{ margin: "0 10px", padding: 10, background: "white" }}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="commentsInput">
                Un commentaire pour notre pizzaïolo ?
              </InputLabel>
              <Input
                id="commentsInput"
                multiline
                rows={3}
                type="text"
                name="comments"
                onChange={this.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12} style={{ margin: "20px 10px" }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
              type="submit"
            >
              Valider
            </Button>
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
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
