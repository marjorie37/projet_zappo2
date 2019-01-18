import React from "react";
import SwipeableViews from "react-swipeable-views";

// MATERIAL UI
import { List, Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// COMPONENTS
import HomePageItem from "./HomePageItem";
import Emitter from "../../emitter";
import { StyledHeaderMenu } from "../../styled/StyledHeader";
import { StyledMainContent } from "../../styled/StyledMainContent";

const GetProducts = props => {
  return <HomePageItem {...props} />;
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  width: {
    width: "100%"
  }
});

class HomePageMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      products: [],
      favorites: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.restoreCart = this.restoreCart.bind(this);
    this.emitter = Emitter;
    this.getFavorites = this.getFavorites.bind(this);
    this.categoryFilter = this.categoryFilter.bind(this);
  }

  componentDidMount() {
    this.restoreCart();
  }

  render() {
    const { classes, theme, products } = this.props;
    const { value } = this.state;
    const ListProducts = ({ tab = [] }) => (
      <List component="ul" className={classes.width}>
        {tab.map((el, i) => {
          return (
            <GetProducts
              key={el + i}
              product={el}
              addProduct={this.addProduct}
            />
          );
        })}
      </List>
    );
    const favorites =
      this.props.products[1] !== undefined && this.getFavorites();

    return (
      <div
        className={classes.root}
        style={{ background: "rgb(243, 243, 242)" }}
      >
        <StyledHeaderMenu position="sticky" color="default" elevation={6}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="on"
          >
            <Tab label="Suggestions" />
            <Tab label="Entrées" />
            <Tab label="Pizze" />
            <Tab label="Desserts" />
            <Tab label="Boissons" />
          </Tabs>
        </StyledHeaderMenu>
        <StyledMainContent>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={this.handleChangeIndex}
          >
            <div>
              {value === 0 && (
                <ListProducts
                  tab={favorites.length > 0 ? favorites : products[0]}
                />
              )}
            </div>
            <div>{value === 1 && <ListProducts tab={products[2]} />}</div>
            <div>{value === 2 && <ListProducts tab={products[1]} />}</div>
            <div>{value === 3 && <ListProducts tab={products[3]} />}</div>
            <div>{value === 4 && <ListProducts tab={products[4]} />}</div>
          </SwipeableViews>
        </StyledMainContent>
      </div>
    );
  }

  /**
   * ----------------------------- FONCTIONS --------------------------
   */
  restoreCart() {
    const tab = JSON.parse(localStorage.getItem("cart"));
    if (tab) {
      this.setState({
        products: tab
      });
    }
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleChangeIndex(index) {
    this.setState({ value: index });
  }

  categoryFilter(category, filters) {
    const filterKeys = Object.keys(filters);
    // filters all elements passing the criteria
    return category.filter(item => {
      // dynamically validate all filter criteria
      return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
    });
  }

  getFavorites() {
    let filters = { favorites: [true] };
    let favoritesTab = [];
    for (let i = 1; i < 5; i++) {
      let tmpFavorites = this.categoryFilter(this.props.products[i], filters);
      favoritesTab.push(...tmpFavorites);
    }
    return favoritesTab;
  }

  addProduct(object) {
    let cart = JSON.parse(localStorage.getItem("cart", []));
    if (cart === null) {
      cart = [];
    }
    const index = cart.findIndex(product => product.id === object.id);

    if (index >= 0) {
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      cart.push(object);
    }
    const stringify = JSON.stringify(cart);
    localStorage.setItem("cart", stringify);

    this.emitter.emit("refreshCart");
  }
}

export default withStyles(styles, { withTheme: true })(HomePageMainContent);
