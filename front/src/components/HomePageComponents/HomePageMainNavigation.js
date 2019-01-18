import React, { Component } from "react";
//import PropTypes from "prop-types";
import photoRestau from "../../assets/img/zappo_lyon.jpg";
import {
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardMedia,
  CardContent
} from "@material-ui/core";
import {
  Menu,
  ShoppingBasket,
  Input,
  AccountCircle,
  Place,
  Assignment,
  PowerSettingsNew
} from "@material-ui/icons";
import {
  BrandZappoSpan,
  StyledHeader,
  StyledBrandZappoMenu
} from "../../styled/Index";
import Linked from "../../styled/StyledLink";
import { withStyles } from "@material-ui/core/styles";
import Emitter from "../../emitter";
import { withRouter } from "react-router-dom";
import { StyledShakedBadge } from "../../styled/StyledAnimations";

const styles = theme => ({
  flex: {
    flex: 1
  },
  card: {
    maxWidth: 260
  },
  list: {
    width: 250
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class HomePageMainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      productsNb: 0,
      open: false,
      animatedBadge: false
    };
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.restoreCart = this.restoreCart.bind(this);
    this.emitter = Emitter;
    this.emitter.addListener("refreshCart", this.restoreCart);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.restoreCart();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  restoreCart() {
    const tab = JSON.parse(localStorage.getItem("cart"));
    if (tab) {
      const nb = tab.reduce((acc, current) => acc + current.quantity, 0);
      this.setState({
        productsNb: nb,
        animatedBadge: true
      });
      setTimeout(() => this.setState({ animatedBadge: false }), 1000);
    }
  }

  handleOpenMenu(e) {
    this.setState({ open: !this.state.open });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ open: false });
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes, user, history } = this.props;

    return (
      <div ref={elt => (this.wrapperRef = elt)}>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={photoRestau}
                title="Zappo à Lyon"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  <StyledBrandZappoMenu>Zappo</StyledBrandZappoMenu>
                </Typography>
                <Typography component="p" style={{ fontSize: "0.8rem" }}>
                  Bistrot Italien, Pizzeria. Produits frais et de qualités,
                  importés directement d'Italie. Sur place et à emporter 7j/7.
                </Typography>
              </CardContent>
            </Card>
            <div className={classes.list}>
              <List component="nav">
                {user && (
                  <Linked to="/compte">
                    <ListItem button component="div">
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText
                        primary="Mon Compte"
                        secondary="Infos et commandes"
                      />
                    </ListItem>
                  </Linked>
                )}
                {user && <Divider />}
                <Linked to="/nous-trouver">
                  <ListItem button component="div">
                    <ListItemIcon>
                      <Place />
                    </ListItemIcon>
                    <ListItemText
                      primary="Nous trouver"
                      secondary="Infos pratiques"
                    />
                  </ListItem>
                  <Divider />
                </Linked>
                <Linked to="/mentions-legales">
                  <ListItem button component="div">
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText
                      primary="Mentions Légales"
                      secondary="Crédits et CGU"
                    />
                  </ListItem>
                </Linked>
              </List>
            </div>
          </div>
        </SwipeableDrawer>
        <StyledHeader position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer("left", true)}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
              align="center"
              onClick={this.backHome}
            >
              <BrandZappoSpan>Zappo</BrandZappoSpan>
            </Typography>
            <div>
              {user !== null && (
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  onClick={() => {
                    localStorage.clear();
                    history.push("/");
                  }}
                >
                  <PowerSettingsNew />
                </IconButton>
              )}
            </div>
            <div>
              {user === null && (
                <Linked to="/identification/connexion">
                  <IconButton color="inherit">
                    <Input />
                  </IconButton>
                </Linked>
              )}
              <Linked to="/mon-panier">
                <IconButton color="inherit">
                  <StyledShakedBadge
                    className={classes.margin}
                    badgeContent={this.state.productsNb}
                    color="secondary"
                    animated={this.state.animatedBadge}
                  >
                    <ShoppingBasket />
                  </StyledShakedBadge>
                </IconButton>
              </Linked>
            </div>
          </Toolbar>
        </StyledHeader>
      </div>
    );
  }
}

// HomePageMainNavigation.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withRouter(withStyles(styles)(HomePageMainNavigation));
