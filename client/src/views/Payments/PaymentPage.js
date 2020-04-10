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

class PaymentPage extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      amount : "25.00",
      errorMessages: [],
    }
  }

  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (errors) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }

    this.setState({ errorMessages: [] })
    alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)

    //insert email trigger request to send invoice of payment


  }

  createVerificationDetails() {
    return {
      amount: this.state.amount,
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        //country: "GB",
        //city: "London",
        //addressLines: ["1235 Emperor's Gate"],
        //postalCode: "SW7 4JA",
        phone: "020 7946 0532"
      }
    }
  }

  newSelection = (e) => {
      this.setState({amount:e.target.value})
  }


  render() {
    return (
      <div id = "pay">
        <h1>Payment Page</h1>

        <label for = "selection">
          Services
        </label>
        <select id = "selection" onChange = {this.newSelection} value = {this.state.amount} >

          <option value = "25.00">
            Pedicure
          </option>

          <option value = "5.00">
            hair
          </option>

          <option value = "10.00">
            Service7
          </option>

          <option value = "20.00">
            new Service
          </option>

          <option value = "25.00">
            Massage
          </option>

          <option value = "5.00">
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
                Pay ${this.state.amount}
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