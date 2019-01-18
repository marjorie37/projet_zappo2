import { Route } from "react-router-dom";
import React from "react";
import HomePage from "./components/HomePage";
import ContUserLogin from "./components/ContUserLogin";
import Basket from "./components/Basket";
import OrdersMain from "./components/ZappoOrdersTablette/OrdersMain";
import PropTypes from "prop-types";

const NewRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} exact path="/" component={HomePage} />
);

// NewRoute.propTypes = {
//   component: PropTypes.element.isRequired,
//   rest: PropTypes.any
// };

const routes = () => {
  return (
    <div>
      <Route path="/compte" component={ContUserLogin} />
      <Route path="/monpanier" component={Basket} />
      <Route path="/orders" component={OrdersMain} />
      <Route exact path="/" component={HomePage} />
    </div>
  );
};

export default routes;
