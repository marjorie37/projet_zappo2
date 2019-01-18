import React from "react";
import PropTypes from "prop-types";

const GetTitle = ({ styled, texte }) => <h1 style={styled}>{texte}</h1>;

// GetTitle.propTypes = {
//     styled: PropTypes.object.isRequired,
//     texte: PropTypes.string.isRequired
// }
export default GetTitle;
