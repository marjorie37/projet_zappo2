import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckOutForm';

class MyStoreCheckout extends React.Component {

  render() {

    return (
      <Elements>
        <InjectedCheckoutForm {...this.props}/>
      </Elements>
    );
  }
}

export default MyStoreCheckout;