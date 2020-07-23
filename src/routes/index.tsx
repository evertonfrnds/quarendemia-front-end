import React from 'react'
import { Switch } from 'react-router-dom'

import PlanRoutes from './plans.routes'
import ClientRoutes from './clients.routes'
import MeasureRoutes from './measures.routes'
import UserRoutes from './users.routes'
import PaymentRoutes from './payments.routes'
import ManagersRoutes from './managers.routes'
import HomeRoutes from './home.routes'

const Routes: React.FC = () => (
  <Switch>
    <>
      <PlanRoutes />
      <ClientRoutes />
      <MeasureRoutes />
      <UserRoutes />
      <PaymentRoutes />
      <ManagersRoutes />
      <HomeRoutes />
    </>
  </Switch>
)

export default Routes
