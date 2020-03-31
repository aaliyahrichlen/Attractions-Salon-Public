import React, {useState, useEffect} from 'react';
import './Home.css';
import ContactCard from "../../components/Contact/ContactCard"
import SlideShow from "../../components/SlideShow/SlideShow";
import fire from "../Login/config/Fire";
import Review from '../../components/ReviewSection/Review';

function Home() {
    return (
        <div>
        <div className="Home">
            <div className="col">
                <ContactCard/>
            </div>
                <div className="slides">
                <SlideShow/>
                </div>
        </div>
        <div className = "review">
            <Review/>
        </div>
        </div>
    );
}

export default Home;
