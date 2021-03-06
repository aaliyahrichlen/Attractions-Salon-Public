import React, {Component} from 'react';
//import ReactDOM from "react-dom";
import './Review.css';
import  Carousel  from  'semantic-ui-carousel-react';

const reviewKey = "AIzaSyDhLHQTNwZu40NisFTOX1XpgRWEQQnG3R0";
const placeID = "ChIJLbSMfFK76IgRiFeXZHbznxo";

let proxyurl = "https://cors-anywhere.herokuapp.com/";
let url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&key=" + reviewKey;


class Review extends React.Component { // you can't use stateless component because you need a state
  constructor () {
    super()
    this.state = {}
  }
  componentDidMount() {
    fetch(proxyurl + url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    }).then((value) => {
      this.setState({val: value})
    })
  }
  render () {
    if (!this.state.val) return null
    let reviewObj = this.state.val.result.reviews;
    console.log(reviewObj)
    
    let  elements  = [
      {
        render:()=>{
          return (
            <div>
              <img
              className="imgProp"
              src={reviewObj[0].profile_photo_url}
            />
              <div className="name">{reviewObj[0].author_name}</div>
              <div className="content">{reviewObj[0].text}</div>
            </div>
            );
        }
      },
      {
        render:()=>{
          return (
            <div>
              <img
              className="imgProp"
              src={reviewObj[1].profile_photo_url}
            />
              <div className="name">{reviewObj[1].author_name}</div>
              <div className="content">{reviewObj[1].text}</div>
            </div>
          );
        }
        },
        {
        render:()=>{
          return (
            <div>
              <img
              className="imgProp"
              src={reviewObj[2].profile_photo_url}
            />
              <div className="name">{reviewObj[2].author_name}</div>
              <div className="content">{reviewObj[2].text}</div>
            </div>
          );
        }
        },
        {
        render:()=>{
          return (
            <div>
              <img
              className="imgProp"
              src={reviewObj[3].profile_photo_url}
            />
              <div className="name">{reviewObj[3].author_name}</div>
              <div className="content">{reviewObj[3].text}</div>
            </div>
          );
        }
        },
        {
        render:()=>{
          return (
            <div>
              <img
             className="imgProp"
              src={reviewObj[4].profile_photo_url}
            />
              <div className="name">{reviewObj[4].author_name}</div>
              <div className="content">{reviewObj[4].text}</div>
            </div>
          );
        }
        },
    ]
    return (
      <div className="Review">
        <div className= "reviewHeader">
                  What people are saying about us!
        </div>
        <Carousel
          elements  =  {  elements  }
          duration  ={3000}
          animation  ='browse'
          showNextPrev  =  {false}
          showIndicators  ={false}
        />
      </div>
    )
  }
}

export default Review;
