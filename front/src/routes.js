import { Route } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const NewRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

// ce que nous donne le "rest" :
// history: {length: 7, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
// location: {pathname: "/", search: "", hash: "", state: undefined}
// match: {path: "/", url: "/", params: {…}, isExact: true}
// path: "/compte"
// roadTab: Array(14)
// 0: {path: "/nous-trouver", component: ƒ}
// 1: {path: "/mentions-legales", component: ƒ}
// 2: {path: "/buon-appetito", component: ƒ}
// 3: {path: "/zappo/orders", component: ƒ}
// 4: {path: "/zappo/connexion", component: ƒ}
// 5: {path: "/", component: ƒ, exact: true}
// 6: {path: "/identification", component: ƒ}
// 7: {path: "/commande/:id", component: ƒ}
// 8: {path: "/mon-panier", component: ƒ}
// 9: {path: "/moncompte/modifier", component: ƒ}
// 10: {path: "/paiement-refuse", component: ƒ}
// 11: {path: "/pizza-offerte", component: ƒ}
// 12: {path: "/compte", component: ƒ}
// 13: {path: "/paiement", component: ƒ}

NewRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.any
};

export const AuthUserRoads = props =>
  props.roadTab.map((route, key) => (
    <NewRoute {...props} {...route} key={`#road${route.path}`} />
  ));
