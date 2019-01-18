import React, { Component } from "react";
import {
  Grid,
  Typography,
  withTheme,
  Divider,
  IconButton
} from "@material-ui/core";
import { Add, Remove, Delete } from "@material-ui/icons";
//import { StyledBtnOutPrice, StyledItemCart } from "../../styled/Index";

class BasketProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.trash = this.trash.bind(this);
    this.getPriceTTC = this.getPriceTTC.bind(this);
  }

  down() {
    this.props.action(this.props.product.id, "down");
    // Listener prints "5 10".
  }
  up() {
    this.props.action(this.props.product.id, "up");
  }
  trash() {
    this.props.action(this.props.product.id, "trash");
  }
  getPriceTTC() {
    return (
      Math.round(
        this.props.product.ht_price *
          (this.props.product.tva / 100 + 1) *
          this.props.product.quantity *
          100
      ) / 100
    );
  }

  render() {
    return (
      <Grid
        alignItems="center"
        container
        spacing={0}
        alignContent="space-between"
        style={{ padding: "5px 0 0 10px" }}
      >
        <Grid item xs={6}>
          <Typography variant="body1" noWrap>
            {this.props.product.name}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center" justify="flex-end">
            <Grid>
              <IconButton variant="outlined">
                <Remove onClick={this.down} color="secondary" />
              </IconButton>
              <span
                style={{
                  fontFamily: "Roboto",
                  fontSize: "0.8rem"
                }}
              >
                {this.props.product.quantity < 1
                  ? 0
                  : this.props.product.quantity}
              </span>
              <IconButton variant="outlined">
                <Add onClick={this.up} color="secondary" />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton variant="fab" aria-label="Delete">
                <Delete onClick={this.trash} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    );
  }
}

export default withTheme()(BasketProducts);
