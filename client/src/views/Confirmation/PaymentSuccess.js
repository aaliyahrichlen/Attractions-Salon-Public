import React from 'react';
import './Confirmation.css';

function PaymentSuccess() {
    return (
        <div class="container123"> {/*I had to change this because if I just have it as container
        the picture goes beyond the container since I am using Bootstrap (Soham)*/}
            <div class="confirm">
                Payment Succeeded!
            </div>
            <p class="confirm-body">Hope to see you soon! You can now close this page or navigate to somewhere else on the website.</p>
        </div>

    );
}

export default PaymentSuccess;