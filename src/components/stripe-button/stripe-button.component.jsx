import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100;
    const publishableKey = "pk_test_VJcliiKef4qScXyTREM2ck3G0086h36Zkh";

    const onToken = token => {
            console.log(token);
            alert('Payment Sucessful');
    }

    return (

         <StripeCheckout labe ='Pay Now' name = 'CRWN Clothing Ltd.'
         billingAddress  
         shippingAddress  
         image = 'https://sendeyo.com/up/d/f3eb2117da'
         description = {`Your total is $${price}`}
         amount={priceForStripe}
         panelLabel= 'Pay Now'
         token ={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;