import React, { Component } from "react";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";
import validator from "validator";
import AccountForm from "./AccountForm";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "login",
      showPassword: false,
      title: "Connectez-vous à votre compte Zappo"
    };
  }

  handleClickShowPassword(e) {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleSubmit(params) {
    const { prevPath } = this.props;
    axios(
      config(
        {
          email: params.userEmail,
          password: params.userPassword
        },
        "/connexion",
        "post"
      )
    ).then(res => {
      const { success, error, token } = res.data;
      const { prevPath, history } = this.props;
      if (success) {
        localStorage.setItem("ZappoToken", token);
        if (prevPath !== null && prevPath === "/mon-panier") {
          history.push("/paiement");
        } else {
          history.push("/");
        }
      }
      if (error) {
        this.setState({ message: error });
      }
    });
  }

  render() {
    const { prevPath, history } = this.props;
    const { formType, title, message } = this.state;

    return (
      <AccountForm
        {...this.props}
        title={title}
        message={<span id="message-id">{message}</span>}
        onOpenSnack={message !== null ? true : false}
        onSubmit={e => this.handleSubmit(e)}
        onSnackClose={() => this.setState({ message: null })}
        formType={formType}
        displayPassInput={true}
        redirectTo={
          prevPath !== null && prevPath === "/mon-panier"
            ? () => history.push("/paiement")
            : () => history.push("/")
        }
      />
    );
  }
}

export default UserLogin;
