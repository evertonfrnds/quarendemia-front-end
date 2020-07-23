import React from 'react'

import Route from './Route'

import Dashboard from '../pages/home/Dashboard'

const MeasureRoutes: React.FC = () => (
  <>
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </>
)

export default MeasureRoutes
