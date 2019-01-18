import React, { Component } from "react";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";


// import PropTypes from "prop-types";

const withUser = ComponentToWrap => {
  class DataProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      };
      this.checkUserLogged = this.checkUserLogged.bind(this);
    }

    componentDidMount() {
      this.checkUserLogged();
    }


    checkUserLogged(){
        axios(
          config(
            {},
            "/moncompte",
            "post"
          )
        ).then(res => {
          const user = res.data;
          return user !== null && user.state ? this.setState({user}) : null;
        });
    }

    render(){
      return <ComponentToWrap  {...this.props} {...this.state} />;
    }
  }

  return DataProvider;
};

export default withUser;
