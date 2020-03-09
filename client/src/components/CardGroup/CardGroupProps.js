import React from 'react'
import { Card } from 'semantic-ui-react'
import nails from './nails.jpg'
import curls from './curls.jpg'
import styling from './styling.jpg'
import stock from './stock.jpg'
import curls2 from './curls2.jpg'
import stock2 from './stock2.jpg'
import './CardGroupProps.css';





const items = [
  {
    header: 'Nails',
    description:
      'Get your nails done!',
    meta: 'Starting price: ',
    color: 'pink',
    image: nails
  },
  {
    header: 'Curls',
    description:
      'Curl your hair!',
    meta: 'Starting price: ',
    color: 'pink',
    image: curls
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Starting price: ',
      color: 'pink',
    image: styling
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Starting price: ',
      color: 'pink',
    image: stock
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Starting price: ',
      color: 'pink',
    image: stock2
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Starting price: ',
      color: 'pink',
    image: curls2
  }
]

const CardGroupProps = () => {
  return (
    <div className="cards">
    <Card.Group centered items={items}/>
    </div>
  );
}

export default CardGroupProps