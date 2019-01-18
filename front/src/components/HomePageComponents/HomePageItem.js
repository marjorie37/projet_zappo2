import React, { Component } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Collapse,
  withStyles
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  AddShoppingCart,
  Info
} from "@material-ui/icons";
import { StyledItem, StyledItemButton } from "../../styled/Index";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  price: {
    fontSize: "1rem",
    color: "#009de0",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "0.6rem"
  }
});

class HomePageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDialog: false,
      animated: false,
      animatedassociated: false
    };
    this.handleSuggestedProduct = this.handleSuggestedProduct.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.highlight = this.highlight.bind(this);
    this.derouler = this.derouler.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({ openDialog: !this.state.openDialog });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSuggestedProduct() {
    this.setState(state => ({ open: !state.open }));
  }

  handleAddProduct(product, key) {
    const newProd = {
      id: product.id,
      name: product.name,
      ht_price: product.ht_price,
      ttc_price: product.ttc_price,
      tva: product.tva,
      quantity: 1,
      category_id: product.category_id
    };
    this.highlight(key);
    this.props.addProduct(newProd);
    this.setState(state => ({ open: true }));
    navigator.vibrate([100]);
  }
  derouler() {
    this.setState(state => ({ open: !this.state.open }));
  }

  highlight(key) {
    this.setState({ [key]: true }, () => {
      setTimeout(() => this.setState({ [key]: false }), 1000);
    });
  }

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  render() {
    const { product, classes } = this.props;
    const { associeProduit } = product;
    const { animated, animatedassociated } = this.state;

    let allergenes = [];
    if (product.allergens !== "") {
      allergenes = product.allergens;
    }
    //const large = product.allergens.length > 0 ? true : false;
    return (
      <StyledItem
        animated={animated ? "true" : null}
        animatedassociated={animatedassociated ? "true" : null}
        divider={true}
        style={{ background: "#ecf0f1", padding: "0" }}
      >
        {/* -------------------------------------- MAIN PRODUCT -------------------------------------- */}
        <Grid container justify="space-between" direction="row">
          {/* ------------------ BLOC NOM ------------------ */}
          <Grid item xs={10} style={{ padding: "15px" }}>
            <Typography variant="title" component="h5" color="primary">
              {product.allergens.length > 0 && (
                <Info
                  color="primary"
                  onClick={this.handleClickOpen}
                  className={classes.button}
                  style={{ verticalAlign: "middle", paddingRight: "5px" }}
                />
              )}
              {product.name}
              {associeProduit.length > 0 && (
                <IconButton button="true" color="secondary">
                  {this.state.open ? (
                    <ExpandLess onClick={this.handleSuggestedProduct} />
                  ) : (
                    <ExpandMore onClick={this.handleSuggestedProduct} />
                  )}
                </IconButton>
              )}
            </Typography>
            <Typography component="p" gutterBottom>
              {product.description}
            </Typography>
          </Grid>
          {/* ------------------ AJOUTER ------------------ */}
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <Typography
              color="secondary"
              variant="subheading"
              className="animated"
            >
              Ajouté
            </Typography>
            <StyledItemButton
              onClick={() => this.handleAddProduct(product, "animated")}
              variant="fab"
              color="secondary"
              mini
              aria-label="add"
              style={{ marginLeft: "auto" }}
            >
              <AddShoppingCart />
            </StyledItemButton>
            <Typography className={classes.price}>
              {(
                Math.round(product.ht_price * (product.tva / 100 + 1) * 100) /
                100
              ).toFixed(2)}{" "}
              <span style={{ color: "#969696" }}>€</span>
            </Typography>
          </Grid>

          {/* ----------------------- ASSOCIATED PRODUCT ---------------------- */}

          {associeProduit.length > 0 && (
            <Collapse
              in={this.state.open}
              timeout="auto"
              unmountOnExit
              style={{ width: "100%" }}
            >
              <Grid
                container
                justify="space-between"
                direction="row"
                style={{
                  margin: "0",
                  padding: "10px 0px",
                  boxShadow: "rgba(100, 100, 100, 0.2) -1px 2px 9px 1px inset",
                  border: "1px solid #ccc",
                  background: "#e8e8e8"
                }}
              >
                <Grid item xs={2} md={1}>
                  <img
                    src={`http://${
                      window.location.hostname
                    }:5000/api/pictures/${associeProduit[0].url}`}
                    alt={associeProduit[0].name}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={8} md={10} style={{ paddingLeft: "10px" }}>
                  <Grid container justify="space-between">
                    <Grid item xs={12}>
                      <Typography
                        variant="caption"
                        component="h6"
                        style={{ color: "rgb(0,158,224)" }}
                      >
                        Suggestion
                      </Typography>
                      <Typography
                        variant="title"
                        component="h5"
                        color="primary"
                      >
                        {associeProduit[0].name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p" gutterBottom>
                        {associeProduit[0].description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2} md={1} style={{ textAlign: "center" }}>
                  <Typography
                    color="secondary"
                    variant="subheading"
                    className="animatedassociated"
                  >
                    Ajouté
                  </Typography>
                  <StyledItemButton
                    onClick={() =>
                      this.handleAddProduct(
                        associeProduit[0],
                        "animatedassociated"
                      )
                    }
                    variant="fab"
                    color="secondary"
                    mini
                    aria-label="Ajouter le produit au panier"
                    style={{ margin: "15px auto auto auto" }}
                  >
                    <AddShoppingCart />
                  </StyledItemButton>
                  <Typography className={classes.price}>
                    {(
                      Math.round(
                        product.ht_price * (product.tva / 100 + 1) * 100
                      ) / 100
                    ).toFixed(2)}{" "}
                    <span style={{ color: "#969696" }}>€</span>
                  </Typography>
                </Grid>
              </Grid>
            </Collapse>
          )}
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            TransitionComponent={this.Transition}
          >
            <DialogContent style={{ marginTop: 50, minWidth: 300 }}>
              <AppBar className={classes.appBar}>
                <Toolbar style={{ paddingRight: "0px" }}>
                  <Typography
                    variant="title"
                    color="inherit"
                    className={classes.flex}
                  >
                    Allèrgenes
                  </Typography>
                  <IconButton
                    color="inherit"
                    onClick={this.handleClickOpen}
                    aria-label="Fermer"
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              {allergenes.length > 0 && (
                <Typography variant="body1">
                  {allergenes.map(
                    (elt, index) =>
                      `${elt}${index === allergenes.length - 1 ? "." : ", "}`
                  )}
                </Typography>
              )}
            </DialogContent>
          </Dialog>
        </Grid>
      </StyledItem>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePageItem);
