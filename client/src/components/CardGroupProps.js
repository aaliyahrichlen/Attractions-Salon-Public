import React from 'react'
import { Card } from 'semantic-ui-react'

const items = [
  {
    header: 'Service title',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'Price: ',
    color: 'pink',
    image: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
  },
  {
    header: 'Service title',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'Price: ',
    color: 'pink',
    image: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
  },
  {
    header: 'Service title',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      meta: 'Price: ',
      color: 'pink',
    image: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
  },
]

const CardGroupProps = () => <Card.Group items={items} />

export default CardGroupProps