import React from 'react';

const ReviewBlock = (props) => {

    let name = props.block.name;
    let content = props.block.content;

    return (


        <div className= "review-block">

                <h4 className= "name">{name}</h4>
                
                <div className="stars">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div> 
                
                <p classname="content">{content}</p>
                
         </div>

    )
}

export default ReviewBlock;