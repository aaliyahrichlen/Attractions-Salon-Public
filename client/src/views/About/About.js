import React from 'react';
import './About.css';
import salonImg from './salon.jpg'

function About() {
    return (
        <div class="container2"> {/*I had to change this because if I just have it as container
        the picture goes beyond the container since I am using Bootstrap (Soham)*/}
            <img src={salonImg} class="spread"></img>
            <h4 >
                At Attractions Salon, we're dedicated to providing a haircut you'll love
            </h4>
        </div>

    );
}

export default About;