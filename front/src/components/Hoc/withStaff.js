import React, { Component } from "react";
import axios from "axios";
import config from "../../assets/lib/axiosStaff";
import Loader from '../ZappoOrdersTablette/Loader';

// import PropTypes from "prop-types";

const withStaff = ComponentToWrap => {
    class DataProvider extends Component {
        constructor(props) {
            super(props);
            this.state = {
            };
            this.checkUserLogged = this.checkUserLogged.bind(this);
        }

        componentDidMount() {
            this.checkUserLogged();
        }


        checkUserLogged() {
            axios(
                config(
                    {},
                    "/moncompte",
                    "post"
                )
            ).then(res => {
                const user = res.data;
                this.setState({ user });
            });
        }

        render() {
            const {user} = this.state;
            return user === undefined ? <Loader/> : <ComponentToWrap  {...this.props} {...this.state} />;
        }
    }

    return DataProvider;
};

export default withStaff;
