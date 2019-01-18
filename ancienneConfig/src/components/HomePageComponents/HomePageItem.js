import React, { Component } from "react";
import {
  Grid,
  Button,
  Typography,
  IconButton,
  withTheme,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  AddShoppingCart,
  ExpandMore
} from "@material-ui/icons";
import lagunitas from "../../assets/img/thumb_lagunitas_ipa.jpg";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class HomePageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSuggestedProduct = this.handleSuggestedProduct.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleSuggestedProduct(event) {

  }

  handleAddProduct(event) {
    
  }

  render() {
    return (
      <div>
        <ExpansionPanel
          style={{
            padding: "0",
            margin: "0",
            background: "rgb(243, 243, 242)"
          }}
        >
          <ExpansionPanelSummary style={{ padding: "0px 15px 10px 15px" }}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: "0px" }}
            >
              <Grid item xs={10}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography
                      onClick={this.handleSuggestedProduct}
                      variant="title"
                      component="h2"
                      color="primary"
                    >
                      Margharita
                      <IconButton color="secondary">
                        <KeyboardArrowDown />
                      </IconButton>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      component="p"
                      style={this.props.theme.infoColor}
                    >
                      <strong>
                        9,90 <span style={{ color: "#919191" }}>€</span>
                      </strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Sauce tomate San Marzano DOP, mozzarella fior di latte,
                      basilic, huile d’olive extra vierge
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <Button
                  onClick={this.handleAddProduct}
                  variant="fab"
                  mini
                  color="secondary"
                  aria-label="add"
                >
                  <AddShoppingCart />
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{
              padding: "20px 15px 15px 10px",
              backgroundColor: "#e1e5e6",
              boxShadow:
                "0 4px 8px 0 rgba(47, 63, 81, 0.22) inset, 0 6px 30px 0 rgba(47, 63, 81, 0.22) inset"
            }}
          >
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              spacing={8}
            >
              <Grid item xs={3}>
                <img
                  src={lagunitas}
                  alt="Lagunitas"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={7}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography
                      variant="caption"
                      component="h6"
                      style={{ color: "rgb(0,158,224)" }}
                    >
                      Suggestion
                    </Typography>
                    <Typography variant="title" component="h2" color="primary">
                      Lagunitas IPA
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      component="p"
                      style={this.props.theme.infoColor}
                    >
                      <strong>
                        3,90 <span style={{ color: "#919191" }}>€</span>
                      </strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Birra alla Spina - 5.3° - Pays Bas
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <Button
                  onClick={this.handleAddProduct}
                  variant="fab"
                  mini
                  color="secondary"
                  aria-label="add"
                  style={{ marginTop: "25px", marginBottom: "auto" }}
                >
                  <AddShoppingCart />
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* <Grid item xs={12} style={{ padding: "10px 15px 15px 15px" }}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={10}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    onClick={this.handleSuggestedProduct}
                    variant="title"
                    component="h2"
                    color="primary"
                  >
                    Margharita
                    <IconButton color="secondary">
                      <KeyboardArrowDown />
                    </IconButton>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    component="p"
                    style={this.props.theme.infoColor}
                  >
                    <strong>
                      9,90 <span style={{ color: "#919191" }}>€</span>
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Sauce tomate San Marzano DOP, mozzarella fior di latte,
                    basilic, huile d’olive extra vierge
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
              <Button variant="fab" mini color="secondary" aria-label="add">
                <AddShoppingCart />
              </Button>
            </Grid>
          </Grid>
        </Grid> */}
        {/* ----------------------- PRODUIT SUGGERE ---------------------- */}
        {/* <Grid
          item
          xs={12}
          style={{ padding: "15px 15px 15px 10px", backgroundColor: "#c6c9ca" }}
        >
          <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={8}
          >
            <Grid item xs={3}>
              <img src={lagunitas} alt="Lagunitas" style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={7}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    onClick={this.handleSuggestedProduct}
                    variant="title"
                    component="h2"
                    color="primary"
                  >
                    Lagunitas IPA
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    component="p"
                    style={this.props.theme.infoColor}
                  >
                    <strong>
                      3,90 <span style={{ color: "#919191" }}>€</span>
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Birra alla Spina - 5.3° - Pays Bas
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
              <Button variant="fab" mini color="secondary" aria-label="add">
                <AddShoppingCart />
              </Button>
            </Grid>
          </Grid>
        </Grid> */}
      </div>
    );
  }
}

export default withTheme()(HomePageItem);
