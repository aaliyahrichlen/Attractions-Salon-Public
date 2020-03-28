import React, {useState, useEffect, useRef} from 'react';
import './About.css';
import salonImg from './salon.jpg'
import fire from "../Login/config/Fire";

const About =() => {
    const [text, setText] = useState("");
    
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/about");
        ref.on("value", function(snapshot) {
                setText(snapshot.val());
        });
    },[]);


    return (
        <div class="container2"> {/*I had to change this because if I just have it as container
        the picture goes beyond the container since I am using Bootstrap (Soham)*/}
            <img src={salonImg} class="spread"></img>
            <h4 >
                {text}
            </h4>
        </div>

    );
}

export default About;