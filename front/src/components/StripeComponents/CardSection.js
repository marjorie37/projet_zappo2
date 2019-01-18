// CardSection.js
import React from "react";

import { CardCVCElement, CardExpiryElement } from "react-stripe-elements";
import { Grid, Typography, Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { StyledNumberCard, StyledGrid } from "../../styled/StyledCard";
import Paper from "@material-ui/core/Paper";
import logoMasterCard from "../../assets/img/masterCard.svg";
import logoVisa from "../../assets/img/visa.svg";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class CardSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      brand: "unknown"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ error, complete, brand }) {
    if (brand) this.setState({ brand });
    if (complete) this.setState({ message: "✔" });
    if (error) this.setState({ message: error.message });
  }

  render() {
    const { classes } = this.props;

    return (
      <StyledGrid item xs={12}>
        <Paper
          style={{ background: "linear-gradient(217deg, #465060, #19203d)" }}
          className={classes.root}
          elevation={3}
        >
          <Grid
            container
            alignItems="flex-end"
            justify="flex-end"
            divider="true"
          >
            <Grid item xs={7}>
              <Typography variant="title" style={{ color: "#fff" }}>
                Transaction
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-end"
                spacing={0}
              >
                <Grid item>
                  {this.state.brand !== "visa" ? (
                    <img
                      src={logoMasterCard}
                      className="pictoCard"
                      width="50"
                      style={{ margin: "3px" }}
                      alt="Master Card"
                    />
                  ) : null}
                  {this.state.brand === "visa" ||
                  this.state.brand === "unknown" ? (
                    <img
                      src={logoVisa}
                      width="50"
                      style={{ margin: "3px" }}
                      alt="Visa"
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            light
            style={{
              color: "#fff",
              margin: "10px 0 20px 0",
              backgroundColor: "#fff"
            }}
          />
          <Grid container style={{ marginTop: "10px" }}>
            <Grid item xs={12}>
              <Typography style={{ color: "#fff" }} variant="body2">
                Numéro de carte{" "}
                {this.state.brand !== "unknown" ? this.state.brand : ""}
              </Typography>
              <FormControl style={{ width: "100%" }}>
                <label style={{ width: "100%" }}>
                  <StyledNumberCard
                    style={{
                      base: {
                        fontSize: "20px",
                        fontFamily: "Roboto Mono",
                        color: "#fff"
                      }
                    }}
                    onChange={this.handleChange}
                  />
                </label>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <FormControl style={{ width: "100%" }}>
                <label>
                  <Typography style={{ color: "#fff" }} variant="body2">
                    Date d'expiration
                  </Typography>
                  <CardExpiryElement
                    onChange={this.handleChange}
                    style={{
                      base: {
                        fontSize: "20px",
                        fontFamily: "Roboto Mono",
                        color: "#fff"
                      }
                    }}
                  />
                </label>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{ width: "100%" }}>
                <Typography style={{ color: "#fff" }} variant="body2">
                  Cryptogramme
                </Typography>
                <label>
                  <CardCVCElement
                    onChange={this.handleChange}
                    style={{
                      base: {
                        fontSize: "20px",
                        fontFamily: "Roboto Mono",
                        color: "#fff"
                      }
                    }}
                  />
                </label>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "20px" }}>
            {this.state.message === "✔" ? (
              <Typography variant="caption" style={{ color: "#2497c1" }}>
                {this.state.message}
              </Typography>
            ) : (
              <Typography variant="caption" style={{ color: "#fff" }}>
                {this.state.message}
              </Typography>
            )}
          </Grid>
        </Paper>
      </StyledGrid>
    );
  }
}

export default withStyles(styles)(CardSection);
