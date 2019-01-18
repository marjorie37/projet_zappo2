import React, { Component } from "react";
import OrderCard from "./OrderCard";
import {
  Typography, Grid, Snackbar,
  Fade } from "@material-ui/core";
import { BrandZappoSpan } from "../../styled/Index";
import { HotTub } from "@material-ui/icons";

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderTab: [],
      order: null,
      message:null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { orderTab, order, status, listItem } = this.props;
    if (!listItem) {
      return (
        <Grid
          container
          direction="row"
          style={{ height: "94vh" }}
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={12} align="center">
            <BrandZappoSpan
              style={{
                margin: "5px auto",
                color: "#031828",
                fontSize: "3rem",
                padding: "0"
              }}
            >
              ZAPPO
            </BrandZappoSpan>
            <Typography
              align="center"
              style={{ margin: "5px auto", color: "#031828", fontSize: "1rem" }}
            >
              Gestion de la vente à emporter
            </Typography>
          </Grid>
        </Grid>
      );
    }
    if (listItem && orderTab.length <= 0) {
      switch (listItem) {
        case "pending":
          return (
            <Grid
              container
              direction="row"
              style={{ height: "94vh" }}
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs={12} align="center">
                <div
                  style={{
                    width: "30%",
                    background: "#fff",
                    borderRadius: "5px",
                    boxShadow: "5px 5px 5px 5px rgba(26, 27, 26, .2)"
                  }}
                >
                  <Typography
                    component="p"
                    variant="title"
                    gutterBottom
                    align="center"
                    style={{
                      padding: "30px 20px 20px 0",
                      color: "#031828"
                    }}
                  >
                    <HotTub style={{ color: "grey", fontSize: "4rem" }} />
                    <br />
                    Aucune commande à valider
                  </Typography>
                </div>
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
            </Grid>
          );
        //break;
        case "accepted":
          return (
            <Grid
              container
              direction="row"
              style={{ height: "94vh" }}
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs={12} align="center">
                <div
                  style={{
                    width: "30%",
                    background: "#fff",
                    borderRadius: "5px",
                    boxShadow: "5px 5px 5px 5px rgba(26, 27, 26, .2)"
                  }}
                >
                  <Typography
                    component="p"
                    variant="title"
                    gutterBottom
                    align="center"
                    style={{
                      padding: "30px 20px 20px 0",
                      color: "#031828"
                    }}
                  >
                    <HotTub style={{ color: "grey", fontSize: "4rem" }} />
                    <br />
                    Aucune commande à préparer
                  </Typography>
                </div>
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
            </Grid>
          );
        //break;
        case "canceled":
          return (
            <Grid
              container
              direction="row"
              style={{ height: "94vh" }}
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs={12} align="center">
                <div
                  style={{
                    width: "30%",
                    background: "#fff",
                    borderRadius: "5px",
                    boxShadow: "5px 5px 5px 5px rgba(26, 27, 26, .2)"
                  }}
                >
                  <Typography
                    component="p"
                    variant="title"
                    gutterBottom
                    align="center"
                    style={{
                      padding: "30px 20px 20px 0",
                      color: "#031828"
                    }}
                  >
                    <HotTub style={{ color: "grey", fontSize: "4rem" }} />
                    <br />
                    Aucune commande annulée
                  </Typography>
                </div>
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
            </Grid>
          );
        //break;
        default:
          return (
            <Grid
              container
              direction="row"
              style={{ height: "94vh" }}
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs={12} align="center">
                <div
                  style={{
                    width: "30%",
                    background: "#fff",
                    borderRadius: "5px",
                    boxShadow: "5px 5px 5px 5px rgba(26, 27, 26, .2)"
                  }}
                >
                  <Typography
                    component="p"
                    variant="title"
                    gutterBottom
                    align="center"
                    style={{
                      padding: "30px 20px 20px 0",
                      color: "#031828"
                    }}
                  >
                    <HotTub style={{ color: "grey", fontSize: "4rem" }} />
                    <br />
                    Aucune commande terminée
                  </Typography>
                </div>
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
            </Grid>
          );
        //break;
      }
    }
    if (order === null || order === undefined) {
      return <div />;
    } else {
      return <OrderCard order={order} status={status} updateStatus={(message) => this.setState(message)}/>;
    }
  }
}

export default OrderDetails;
