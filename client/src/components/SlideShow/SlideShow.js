import  React, {useState, useEffect}  from  'react';
import  Carousel  from  'semantic-ui-carousel-react';
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

import "./SlideShow.css"

const SlideShow = () => {
	const [imagesURL, setImagesURL] = useState([]);
	//const [onlyOnce, setOnlyOnce] = useState(true); 
	useEffect(() =>{

		var storageRef = storage.ref();
		var listRef = storageRef.child('images/slideshow/');
		listRef.listAll().then(function(res) {
		res.prefixes.forEach(function(folderRef) {
			// All the prefixes under listRef.
			// You may call listAll() recursively on them.
		});
		res.items.forEach(function(itemRef) {
			var singleUrl = itemRef.getDownloadURL().then(function(url){
				console.log(url);
				setImagesURL(imagesURL => imagesURL.concat(url));
			}).then(function(e){
				alert(imagesURL[0]);
			})
			// All the items under listRef.
		});
		}).catch(function(error) {
		// Uh-oh, an error occurred!
		});

	},[])

    let  pictures  = [
			{
			render:()=>{
				return <Button  ><Image size='large' src={image1} />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button><Image size='medium' src={image2} />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button  ><Image size='medium' src={image3} />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='medium' src={image4} />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='medium' src={image5} />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='large'src={image6} />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='medium' src={image7} />
        </Button>
			}
		},
	  /*{
			render:()=>{
				return <Button  fluid><Image src="" />
        </Button>
			}
		}, */
	]
	return (
		<div id = "Slides">
			<div className="shadow">
			<Carousel
				elements  =  {  pictures  }
				duration  ={3000}
				animation  ='slide left'
				showNextPrev  =  {false}
				showIndicators  ={true}
			/>
			</div>
		</div>
	)
};

export default SlideShow;
