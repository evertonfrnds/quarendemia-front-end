import React from 'react'

import Route from './Route'

import ListMeasures from '../pages/measures/ListMeasures'
import CreateMeasure from '../pages/measures/CreateMeasure'
import EditMeasure from '../pages/measures/EditMeasure'

const MeasureRoutes: React.FC = () => (
  <>
    <Route path="/measures-list" component={ListMeasures} isPrivate />
    <Route path="/measures-create" component={CreateMeasure} isPrivate />
    <Route path="/measures-edit" component={EditMeasure} isPrivate />
  </>
)

export default MeasureRoutes
