import React from 'react';
import './Confirmation.css';

function ActionFailed() {
    return (
        <div class="container123"> {/*I had to change this because if I just have it as container
        the picture goes beyond the container since I am using Bootstrap (Soham)*/}
            <div class="confirm">
                Action Failed!
            </div>
            <p class="confirm-body">The action performed was invalid, there may be an error with the link used. If the action persists, please contact a developer</p>
        </div>

    );
}

export default ActionFailed;