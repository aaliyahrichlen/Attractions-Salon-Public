import React from 'react'
import { Card } from 'semantic-ui-react'
import nails from './nails.jpg'
import curls from './curls.jpg'
import styling from './styling.jpg'
import stock from './stock.jpg'
import curls2 from './curls2.jpg'
import stock2 from './stock2.jfif'





const items = [
  {
    header: 'Nails',
    description:
      'Get your nails done!',
    meta: 'Price: ',
    color: 'pink',
    image: nails
  },
  {
    header: 'Curls',
    description:
      'Curl your hair!',
    meta: 'Price: ',
    color: 'pink',
    image: curls
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Price: ',
      color: 'pink',
    image: styling
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Price: ',
      color: 'pink',
    image: stock
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Price: ',
      color: 'pink',
    image: stock2
  },
  {
    header: 'Styling',
    description:
      'Style your hair!',
      meta: 'Price: ',
      color: 'pink',
    image: curls2
  }
]

const CardGroupProps = () => <Card.Group centered items={items} />

export default CardGroupProps