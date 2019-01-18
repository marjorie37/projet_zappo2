import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

const TabContainer = props => {
return <Grid container style={props.style}>{props.children}</Grid>;
};

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };

export default TabContainer;
