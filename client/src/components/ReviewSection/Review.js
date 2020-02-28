import React from 'react';
import ReactDOM from "react-dom";
import './Review.css';
import ReviewBlock from './reviewBlock';

const Review = () => {
    return (
        <footer className= "Review">
            <div className= "reviewHeader">
                <h3>Reviews</h3>
            </div>


            <ReviewBlock 
                block={{name: "Melissa", content: "Beautiful building that holds beautiful spirits. Brandi, you are great. Thanks for the great hair cut."}}
            />
            

            <ReviewBlock
                block={{name:"Jackie Marsh",
                content:"Been coming here for years, my stylist is Brandi. I recommend to anyone needing a great cut/ style and extras"
                }}
            />
            
            
            

            {/* <div className= "reviewBlock">
                <div className= "name">
                    <h4>Jackie Marsh</h4>
                </div>
                <div className="stars">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className= "content">
                    <p>Been coming here for years, my stylist is Brandi. 
                        I recommend to anyone needing a great cut/ style and extras</p>
                </div>
            </div> */}

        </footer>
    )
};

export default Review;
