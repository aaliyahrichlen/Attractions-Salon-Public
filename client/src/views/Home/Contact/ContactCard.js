import React from 'react';
import './ContactCard.css';
import { Container } from 'semantic-ui-react'

const ContactCard = (props) => {
    return (
        <div>
        <div class="ui card" >
            <div class="content">
                <div class="header">Contact Us!</div>
            </div>
            <div class="content"> 
                <h4 class="ui header">Phone Number</h4>
                    <div class="ui small feed">
                    <div class="event">
                        <div class="content">
                        <div class="summary">
                            (352)376-6008
                        </div>
                        </div>
                    </div>
                </div>
                <h4 class="ui header">Address</h4>
                    <div class="ui small feed">
                    <div class="event">
                        <div class="content">
                        <div class="summary">
                            4509 NW 23 Ave
                        </div>
                        <div class="summary">
                            Gainesville, FL 32606
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13866.361649425104!2d-82.3913716!3d29.6736577!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1a9ff37664975788!2sAttractions%20Salon!5e0!3m2!1sen!2sus!4v1582755425712!5m2!1sen!2sus" 
                    width="100%" height="200" frameborder="0" 
                    allowfullscreen="">
                </iframe>
                </div>
                <div>
                <form action='Appointments' className="wrapper">
                    <button href="#" class="myButton">Scehdule an appointment!</button>
                </form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ContactCard;