import React from 'react';
import './Confirmation.css';

function ConfirmationFailed() {
    return (
        <div class="container123"> {/*I had to change this because if I just have it as container
        the picture goes beyond the container since I am using Bootstrap (Soham)*/}
            <div class="confirm">
                Appointment Failed To Confirm!
            </div>
            <p class="confirm-body">There is an error with the database, please contact the developer.</p>
        </div>

    );
}

export default ConfirmationFailed;