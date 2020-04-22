import React from 'react';
import './ContactCard.css';
import { Container } from 'semantic-ui-react';

const ContactCard = (props) => {
    return (
        <div className="card">
        <div class="ui card" id='contactcardcard'>
            <div class="content">
                <div class="header" className="head">Attractions Salon</div>
            </div>
            <div class="content">
            <h4 class="ui header" className="infoHead">Highlighting your natural beauty</h4> 
            <form action='Appointments' className="buf">
                
                <button  class="medium ui pink button" >
                    <i class="calendar alternate icon"></i>
                    Request an Appointment!
                </button>
                
            </form>
            <div className="buf">
                    <div class="ui grid">
                        <div class="two wide column"><i class="phone square large icon"></i></div>
                        <div class="twelve wide column">(352)376-6008</div>
                    </div>
                    <div class="ui grid">   
                        <div class="two wide column"><i class="address book large icon"></i></div>
                        <div class="twelve wide column">4509 NW 23 Ave<br/>Gainesville, FL 32606</div>
                    </div>             
            </div>
                <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13866.361649425104!2d-82.3913716!3d29.6736577!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1a9ff37664975788!2sAttractions%20Salon!5e0!3m2!1sen!2sus!4v1582755425712!5m2!1sen!2sus" 
                    width="100%" height="200" frameborder="0" 
                    allowfullscreen="">
                </iframe>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ContactCard;

