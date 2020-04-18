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
      amount: "2500",
      errorMessages: [],
      newRedirect: null,
    }
    this.newSelection = this.newSelection.bind(this)
  }
   

  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (!errors.every((err)=> err === null)) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }
    this.setState({ errorMessages: [] })
    alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)

    Axios.post(API_BASE + "/api/processPayment", {nonce : nonce, amount : this.state.amount})
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
      amount: this.state.amount,
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

  newSelection = (e) => {
      this.setState({amount:e.target.value})
  }


  render() {

    if(this.state.newRedirect)
    {
        return <Redirect to={this.state.newRedirect} />
    }

    return (
      <div id = "pay">
        <h1>Payment Page</h1>

        <label for = "selection">
          Services
        </label>
        <select id = "selection" onChange = {this.newSelection.bind(this)} value  = {this.state.amount} >

          <option value = "2500">
            Pedicure
          </option>

          <option value = "500">
            hair
          </option>

          <option value = "1000">
            Service7
          </option>

          <option value = "2000">
            new Service
          </option>

          <option value = "2500">
            Massage
          </option>

          <option value = "500">
            Manicure
          </option>

        </select>


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
                Pay ${Number(this.state.amount) / 100}
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