import React from 'react';
import './Confirmation.css';

function ApptTimeSuccess() {
    return (
        <div class="container123"> {/*I had to change this because if I just have it as container
        the picture goes beyond the container since I am using Bootstrap (Soham)*/}
            <div class="confirm">
                Submission of New Appointment Time Succeeded!
            </div>
            <p class="confirm-body">Please wait for a confirmation email from the salon owner. You can now close this page or navigate to somewhere else on the website.</p>
        </div>

    );
}

export default ApptTimeSuccess;