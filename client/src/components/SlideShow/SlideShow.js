import  React  from  'react';
import  Carousel  from  'semantic-ui-carousel-react';
import { Image, Button} from  'semantic-ui-react';
import image1 from './Photos/fb1.jpg';
import image2 from './Photos/stock1.jpeg';
import image3 from './Photos/stock2.jpeg'
import image4 from './Photos/stock3.jpeg'
import image5 from './Photos/stock4.jpeg'
import image6 from './Photos/stock5.jpeg'
import image7 from './Photos/stock6.jpeg'

import "./SlideShow.css"

const SlideShow = () => {
    
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
