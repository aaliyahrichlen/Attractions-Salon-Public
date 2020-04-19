import { Redirect } from "react-router-dom";
import 'react-square-payment-form/lib/default.css'
import './PaymentPage.css';

import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from 'react-square-payment-form'

import React, { Component } from 'react';
import Axios from 'axios';

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:6163';

class PaymentPage extends React.Component {

  //const [newRedirect, setNewRedirect] = useState(null);//change this

  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      errorMessages: [],
      newRedirect: null,
      serviceName: ""
    }
    this.confirmId = props.match.params.confirmId
  }
   
  componentDidMount() {
    //Get the price of the appointment from the backend
    Axios.post(API_BASE + "/api/appointmentPrice", {confirmation_code : this.confirmId})
    .then(response =>{
      if(response.data === "FAILURE")
      {
        //Redirect to action failed
        this.setState({newRedirect: '/actionfailed'});
      }else{
        this.setState({amount: response.data.price, serviceName: response.data.name})
        //Redirect to already paid for page
        if(response.data.paid)
        {
          this.setState({newRedirect: '/alreadyPaid'});
        }
      }
    });
  }

  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (!errors.every((err)=> err === null)) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }
    this.setState({ errorMessages: [] })

    Axios.post(API_BASE + "/api/processPayment", {nonce : nonce, amount : this.state.amount, confirmation_code: this.confirmId})
    .then(response =>{
      if(response.data === "OK")
      {
        this.setState({newRedirect: '/paymentSuccess'});
        console.log(this.state.newRedirect);
      }
      else{
        this.setState({newRedirect: '/actionfailed'});
      }
    });

    //add files in confirmations folder just like what noah did

    //insert email trigger request to send invoice of payment


  } 

  createVerificationDetails = () =>  {
    return {
      amount: String(this.state.amount),
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532"
      }
    }
  }

  render() {

    if(this.state.newRedirect)
    {
        return <Redirect to={this.state.newRedirect} />
    }

    return (
      <div id = "pay">
        <h1 id = "header">Payment</h1>
        <div className="payments">

        <SquarePaymentForm
          sandbox={true}
          applicationId={"sandbox-sq0idb-R7_dh36xlu1Y-1L_QlhRJQ"}
          locationId={"F0GHTXNC5N72A"}
          cardNonceResponseReceived={this.cardNonceResponseReceived}
          createVerificationDetails={this.createVerificationDetails}
        >


            <fieldset className="sq-fieldset">
              <CreditCardNumberInput />
              <div className="sq-form-third">
                <CreditCardExpirationDateInput />
              </div>

              <div className="sq-form-third">
                <CreditCardPostalCodeInput />
              </div>

              <div className="sq-form-third">
                <CreditCardCVVInput />
              </div>
            </fieldset>

            <CreditCardSubmitButton>
                Pay ${(this.state.amount / 100).toFixed(2)} for {this.state.serviceName}
            </CreditCardSubmitButton>

        </SquarePaymentForm>
        </div>
        <div className="sq-error-message">
          {this.state.errorMessages.map(errorMessage =>
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          )}
        </div>

      </div>
    )
  }
}


export default PaymentPage;