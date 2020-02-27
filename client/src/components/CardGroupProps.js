import React from 'react'
import { Card } from 'semantic-ui-react'

const items = [
  {
    header: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'ROI: 30%',
    color: 'pink',
    image: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
  },
  {
    header: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
    color: 'pink',
    image: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
  },
  {
    header: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
    color: 'pink',
    image: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
  },
]

const CardGroupProps = () => <Card.Group items={items} />

export default CardGroupProps