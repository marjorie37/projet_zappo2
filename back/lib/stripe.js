const stripe = require("stripe")("sk_test_SNRAP38yGDNVQICEAZOTDpza");


//Create charge witth token send by front (need object with amount, token ...)
// Capture it default true else you must pass capture: false
const stripeCreateCharge= charge => stripe.charges.create(charge);

//Retrieve a charge using api stripe and res charge object
const stripeRetrieveCharge = stripeToken => stripe.charges.retrieves(stripeToken);

//Capture a charge after authorize this charge
const stripeCaptureCharge = stripeToken => stripe.charges.capture(stripeToken);

//Create a Customer
const stripeCreateCustomer = customer => stripe.customers.create(customer);

//Retrieve a Customer
const stripeRetrieveCustomer = customerToken => stripe.customers.retrieve(customerToken);


//Update a Customer
const stripeUpdateCustomer = (customerToken, data) => stripe.customers.update(customerToken,data);

//Refund a charge
const stripeRefundCharge = charge => stripe.refunds.create({charge});

module.exports={
    stripeCaptureCharge,
    stripeCreateCharge,
    stripeRetrieveCharge,
    stripeCreateCustomer,
    stripeRetrieveCustomer,
    stripeUpdateCustomer,
    stripeRefundCharge
};