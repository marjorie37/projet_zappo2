import React, { Component } from "react";
import MainHeader from "./MainHeader";
import NotificationCard from "./NotificationCard";
import RootContainer from "../styled/RootContainer";
import car from "../assets/img/car.jpg";
import pizza from "../assets/img/graziePicturePizza.jpg";

class ContOfferedPizza extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifTitle: "Pizza offerte",
      notifText:
        "Votre compte fidélité Zappo vous donne droit à une pizza offerte. La pizza offerte sera automatiquement déduite de votre prochaine commande"
    };
  }
  render() {
    return (
      <div>
        <RootContainer>
          <MainHeader
            image={car}
            pageTitle="GRAZIE !"
            subTitle="Zappo vous remercie"
            subTitle2="de votre fidélité"
          />
          <NotificationCard
            notifImage={pizza}
            notifTitle={this.state.notifTitle}
            notifText={this.state.notifText}
          />
        </RootContainer>
      </div>
    );
  }
}

export default ContOfferedPizza;
