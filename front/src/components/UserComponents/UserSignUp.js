import React, { Component } from "react";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";
import { AccountForm } from "./Index";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "signin",
      title: "Créez votre compte Zappo"
    };
  }

  handleCheckEmail(e) {
    e.persist();
    if (e.target.name === "email") {
      const email = e.target.value;
      axios(config({ email }, "/checkmail", "post")).then(res => {
        const { success, error, user } = res.data;
        if (error) {
          this.setState({ message: error });
        }
        if (success && user !== null) {
          e.target.value = "";
          this.setState({ message: "Cette adresse mail existe déjà" });
        }
      });
    }
  }

  handleSubmit(params) {
    axios(
      config(
        {
          name: params.userName,
          email: params.userEmail,
          phone: params.userPhone,
          password: params.userPassword
        },
        "/creermoncompte",
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
    const { formType, message, title } = this.state;
    return (
      <AccountForm
        {...this.props}
        title={title}
        message={<span id="message-id">{message}</span>}
        onOpenSnack={message !== null && message !== undefined ? true : false}
        onSubmit={e => this.handleSubmit(e)}
        onSnackClose={() => this.setState({ message: null })}
        formType={formType}
        onBlurCheck={params => this.handleCheckEmail(params)}
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

export default User;
