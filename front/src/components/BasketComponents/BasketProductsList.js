import React, { Component } from "react";
import BasketProducts from "./BasketProducts";
import RewardPoints from "./RewardPoints";
import { Grid, List } from "@material-ui/core";
import { StyledListItem } from "../../styled/Index";
import imageTable from "../../assets/img/emptyPicture.jpg";
import EmptyCard from "../EmptyCard";

class BasketProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <List
        style={{
          padding: 0,
          height: "100%",
          overflow: "scroll",
          background: "#fff",
          overflowX: "hidden"
        }}
      >
        {this.props.products.length > 0 && (
          <StyledListItem>
            <RewardPoints />
          </StyledListItem>
        )}
        {this.props.products.length ? (
          this.props.products.map((product, key) => (
            <BasketProducts
              key={product.name + key}
              action={this.props.action}
              product={product}
            />
          ))
        ) : (
          <StyledListItem style={{ background: "none" }}>
            <Grid container justify="center" alignItems="stretch" spacing={0}>
              <Grid
                item
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  marginTop: "5%"
                }}
              >
                <EmptyCard
                  title="Panier vide"
                  image={imageTable}
                  comment="Votre panier est vide, que diriez vous de jeter un oeil aux suggestions du chef ?"
                  link="/"
                  buttonText="Voir les suggestions"
                />
              </Grid>
            </Grid>
          </StyledListItem>
        )}
      </List>
    );
  }
}

export default BasketProductsList;
