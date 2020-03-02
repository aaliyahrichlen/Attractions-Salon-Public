import React from 'react'
import { Card } from 'semantic-ui-react'
import nails from './nails.jpg'
import curls from './curls.jpg'
import styling from './styling.jpg'

const items = [
  {
    header: 'Service title',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'Price: ',
    color: 'pink',
    image: nails
  },

  {
    header: 'Service title',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'Price: ',
    color: 'pink',
    image: curls
  },
  {
    header: 'Service title',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      meta: 'Price: ',
      color: 'pink',
    image: styling
  },
]

const CardGroupProps = () => <Card.Group centered items={items} />

export default CardGroupProps