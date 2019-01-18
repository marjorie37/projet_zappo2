import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu, ShoppingBasket, Input } from "@material-ui/icons";
import { BrandZappoSpan } from "../../styled/Index";
import { withStyles } from "@material-ui/core/styles";
//import BasketCategoryNavigation from "./BasketCategoryNavigation";
const styles = {
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class HomePageMainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null
    };
    this.handleOpenBasket = this.handleOpenBasket.bind(this);
    this.handleGoLogin = this.handleGoLogin.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
  }

  // handleChange(event, checked) {
  //   this.setState({ auth: checked });
  // }
  handleOpenMenu(event) {

  }

  handleOpenBasket(event) {

  }

  handleGoLogin(event) {

  }

  // handleClose() {
  //   this.setState({ anchorEl: null });
  // }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleOpenMenu}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
              align="center"
            >
              <BrandZappoSpan>Zappo</BrandZappoSpan>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleGoLogin}
                  color="inherit"
                >
                  <Input />
                </IconButton>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleOpenBasket}
                  color="inherit"
                >
                  <ShoppingBasket />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// HomePageMainNavigation.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(HomePageMainNavigation);
