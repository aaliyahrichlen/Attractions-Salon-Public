import 'react-square-payment-form/lib/default.css'
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
  }

  createVerificationDetails() {
    return {
      amount: '100.00',
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
    return (
      <div>
        <h1>Payment Page</h1>

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
                Pay $1.00
            </CreditCardSubmitButton>


        </SquarePaymentForm>

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