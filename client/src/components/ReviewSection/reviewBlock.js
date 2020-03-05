import React from 'react';
import './reviewBlock.css';

const ReviewBlock = (props) => {

    let name = props.block.name;
    let content = props.block.content;

    return (


        <div className= "review-block">

                <div className= "name">{name}</div>
                
                <div className="stars">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div> 
                
                <p classname="content">{content}</p>
                
         </div>

    )
}

export default ReviewBlock;