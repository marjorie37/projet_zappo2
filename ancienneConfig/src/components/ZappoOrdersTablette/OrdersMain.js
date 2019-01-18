import React, { Component } from 'react';
import OrdersContainer from '../../styled/OrdersContainer';
import { StyledNavigation, StyledMenuBox, StyledMenuIconSvg, StyledMenuIcon } from '../../styled/StyledOrdersNav';



class OrdersMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <OrdersContainer>
                <StyledNavigation>
                    <StyledMenuBox>
                        <StyledMenuIcon></StyledMenuIcon>
                        <StyledMenuIconSvg x="0" y="0" width="54px" height="54px" viewBox="0 0 54 54">
                            <circle cx="27" cy="27" r="26"></circle>
                        </StyledMenuIconSvg>
                    </StyledMenuBox>
                </StyledNavigation>
                <h1>hello</h1>
            </OrdersContainer>
        );
    }
}

export default OrdersMain;