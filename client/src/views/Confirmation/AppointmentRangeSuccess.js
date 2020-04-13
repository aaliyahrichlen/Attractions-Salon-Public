import React from 'react';
import './Confirmation.css';

function ApptRangeSuccess() {
    return (
        <div class="container123"> {/*I had to change this because if I just have it as container
        the picture goes beyond the container since I am using Bootstrap (Soham)*/}
            <div class="confirm">
                Submission of Time Range Succeeded!
            </div>
            <p class="confirm-body">You can now close this page or navigate to somewhere else on the website.</p>
        </div>

    );
}

export default ApptRangeSuccess;