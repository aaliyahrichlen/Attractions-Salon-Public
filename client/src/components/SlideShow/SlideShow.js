import  React  from  'react';
import  Carousel  from  'semantic-ui-carousel-react';
import { Image, Button} from  'semantic-ui-react';
//import image# from './logo512.png';
import "./SlideShow.css"

const SlideShow = () => {
    
    let  pictures  = [
			{
			render:()=>{
				return <Button  ><Image size='medium' src="http://bit.ly/391CoDq" />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button  id = "hor"><Image size='large' src="http://bit.ly/2uuNotY" />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button  ><Image size='medium' src="https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='medium' src="https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='medium' src="https://images.pexels.com/photos/3617660/pexels-photo-3617660.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='large'src="https://images.pexels.com/photos/3276685/pexels-photo-3276685.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Button>
			}
		},
		{
			render:()=>{
				return <Button ><Image size='medium' src="https://images.pexels.com/photos/936075/pexels-photo-936075.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
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
		<div  id = "Slides">
			<Carousel
				elements  =  {  pictures  }
				duration  ={3000}
				animation  ='slide left'
				showNextPrev  =  {false}
				showIndicators  ={true}
			/>
		</div>
	)
};

export default SlideShow;
