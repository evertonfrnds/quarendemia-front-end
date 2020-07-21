import React from 'react'

import Route from './Route'

import ListPlans from '../pages/plans/ListPlans'
import CreatePlan from '../pages/plans/CreatePlan'
import EditPlan from '../pages/plans/EditPlan'

const PlanRoutes: React.FC = () => (
  <>
    <Route path="/plans-list" component={ListPlans} isPrivate />
    <Route path="/plans-create" component={CreatePlan} isPrivate />
    <Route path="/plans-edit" component={EditPlan} isPrivate />
  </>
)

export default PlanRoutes
