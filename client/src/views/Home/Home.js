import React from 'react';
import './Home.css';
import ContactCard from "../../components/Contact/ContactCard"
import SlideShow from "../../components/SlideShow/SlideShow";
import Review from '../../components/ReviewSection/Review';
function Home() {
    return (
        <div className="Home">
            <ContactCard></ContactCard>
            <SlideShow/>
            <Review/>
        </div>
    );
}

export default Home;
