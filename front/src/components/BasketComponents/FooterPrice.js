import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";

import { Payment } from "@material-ui/icons";
import { StyledFooterPrice } from "../../styled/StyledNotifCard";

class FooterPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidUpdate() {
    localStorage.setItem("TTC", this.getTotal());
    localStorage.setItem("HT", this.getTotalNoVat());
  }

  totalNoVat() {
    const sums = this.props.products.map(
      product => product.ht_price * product.quantity
    );
    const total = sums.reduce((acc, current) => {
      return acc + current;
    }, 0);

    return Math.round(total * 100) / 100;
  }

  noVatPercent(vat = 10) {
    const sums = this.props.products
      .filter(product => product.tva === vat)
      .map(product => product.ht_price * product.quantity * (vat / 100));
    const total = sums.reduce((acc, current) => {
      return acc + current;
    }, 0);

    return Math.round(total * 100) / 100;
  }

  getTotal() {
    const sums = this.props.products.reduce(
      (ac, product) => ac + product.ttc_price * product.quantity,
      0
    );
    return sums.toFixed(2);
  }

  getTotalNoVat() {
    const sums = this.props.products.reduce(
      (ac, product) => ac + product.ht_price * product.quantity,
      0
    );
    return sums.toFixed(2);
  }

  redirectTo() {
    const { user, history,location, checkMessage } = this.props;
    if(checkMessage()){
      if (!user) history.push("/identification/connexion", {url:location.pathname})
      else history.push("/paiement");
    }
  }

  render() {
    const { products } = this.props;

    return (
      <StyledFooterPrice>
        <div>
          <Button variant="fab" color="secondary" onClick={() => this.redirectTo()}>
            <Payment />
          </Button>
        </div>

        <Grid
          container
          justify="flex-end"
          style={{ padding: "0 20px 10px 20px" }}
        >
          <Grid
            container
            justify="space-between"
            style={{ borderBottom: "1px dotted #fff", paddingBottom: "1rem" }}
          >
            <Grid item xs={6}>
              <Typography variant="title" style={{ color: "#fff" }}>
                Total TTC
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="title"
                align="right"
                style={{ color: "#fff" }}
              >
                {products.length > 0 && this.getTotal()} €
              </Typography>
            </Grid>
          </Grid>
          {/* -------------------------- Dont TVA 10 -------------------------- */}
          <Grid
            container
            justify="space-between"
            style={{
              borderBottom: "1px dotted #fff",
              padding: "0.2rem 0rem"
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Dont TVA 10%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                align="right"
                style={{ color: "#fff" }}
              >
                {products.length > 0 && this.noVatPercent(10)}
              </Typography>
            </Grid>
          </Grid>
          {/* -------------------------- Dont TVA 20 -------------------------- */}
          <Grid
            container
            justify="space-between"
            style={{
              borderBottom: "1px dotted #fff",
              padding: "0.2rem 0rem"
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Dont TVA 20%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                align="right"
                style={{ color: "#fff" }}
              >
                {products.length > 0 && this.noVatPercent(20)}
              </Typography>
            </Grid>
          </Grid>
          {/* -------------------------- Total TTC -------------------------- */}
          <Grid
            container
            justify="space-between"
            style={{
              padding: "0.2rem 0rem"
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Total HT
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                align="right"
                style={{ color: "#fff" }}
              >
                {products.length > 0 && this.totalNoVat()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </StyledFooterPrice>
    );
  }
}

export default FooterPrice;
