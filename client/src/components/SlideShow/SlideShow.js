import  React, {useState, useEffect}  from  'react';
import  Carousel  from  'semantic-ui-carousel-react';
//import Carousel from '@brainhubeu/react-carousel';
import { Image, Button} from  'semantic-ui-react';
import image1 from './Photos/fb1.jpg';
import image2 from './Photos/stock1.jpeg';
import image3 from './Photos/stock2.jpeg'
import image4 from './Photos/stock3.jpeg'
import image5 from './Photos/stock4.jpeg'
import image6 from './Photos/stock5.jpeg'
import image7 from './Photos/stock6.jpeg'
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
//import { Slide } from 'react-slideshow-image';

import "./SlideShow.css"

const SlideShow = () => {
	const [imagesURL, setImagesURL] = useState([]);
	const [picturesArray, setPicturesArray] = useState([]); 
	const [picture, setPicture] = useState([]);
		/*render:()=>{
			return <Button  ><Image size='large' src={image1} /></Button>
			}
	}]) */
	useEffect(() =>{

		var storageRef = storage.ref();
		var listRef = storageRef.child('images/slideshow/');
		listRef.listAll().then(function(res) {
		res.items.forEach(function(itemRef) {
			var singleUrl = itemRef.getDownloadURL().then(function(url){
				setImagesURL(imagesURL => imagesURL.concat(url));
			});
			// All the items under listRef.
			//set state = res.items
		});
		}).catch(function(error) {
			console.log(error);// Uh-oh, an error occurred!
		});

	},[]);

	useEffect(() =>{
		imagesURL.map((val) => {
			console.log(val);
			setPicture([{
				render:()=>{
					return <Button  ><Image size='large' src={val} /></Button>
					}
			}])
		})
	}, [imagesURL])

	useEffect(()=>{
		setPicturesArray(picturesArray => picturesArray.concat(picture));
	}, [picture])

    // let  pictures  = [
	// 		{
	// 		render:()=>{
	// 			return <Button  ><Image size='large' src={image1} />
    //     </Button>
	// 		}
	// 	},
	// 	{
	// 		render:()=>{
	// 			return <Button><Image size='medium' src={image2} />
    //     </Button>
	// 		}
	// 	},
	// 	{
	// 		render:()=>{
	// 			return <Button  ><Image size='medium' src={image3} />
    //     </Button>
	// 		}
	// 	},
	// 	{
	// 		render:()=>{
	// 			return <Button ><Image size='medium' src={image4} />
    //     </Button>
	// 		}
	// 	},
	// 	{
	// 		render:()=>{
	// 			return <Button ><Image size='medium' src={image5} />
    //     </Button>
	// 		}
	// 	},
	// 	{
	// 		render:()=>{
	// 			return <Button ><Image size='large'src={image6} />
    //     </Button>
	// 		}
	// 	},
	// 	{
	// 		render:()=>{
	// 			return <Button ><Image size='medium' src={image7} />
    //     </Button>
	// 		}
	// 	},
	//   /*{
	// 		render:()=>{
	// 			return <Button  fluid><Image src="" />
    //     </Button>
	// 		}
	// 	}, */
	// ]

	return (
		<div id="slide" className="shadow">
	<Carousel
		elements  =  { picturesArray }
		duration  ={4000}
		animation  ='browse'
		showNextPrev  =  {false}
		showIndicators  ={false}
	/>
	</div>
	)
	
};

export default SlideShow;

/*return (
	<div id="slide">
	<Carousel
		elements  =  { picturesArray }
		duration  ={4000}
		animation  ='slide left'
		showNextPrev  =  {false}
		showIndicators  ={true}
	/>
	</div>
)*/