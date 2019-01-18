import React, { Component } from "react";
import axios from "axios";
import config from "../assets/lib/axiosConfig";
import PropTypes from "prop-types";

const ZappoProvider = ComponentToWrap => {
  class DataProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {}
      };
    }

    componentDidMount() {
      axios(
        config(
          { email: "polo@gmail.com", password: "123456" },
          "/connexion",
          "post"
        )
      ).then(res => {
        const user = res.data;

        this.setState({ user });
      });
    }

    render() {
      const data = {
        user: "tony"
      };

      return <ComponentToWrap data={data} {...this.props} {...this.state} />;
    }
  }

  return DataProvider;
};

export default ZappoProvider;
