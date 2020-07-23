import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'

import PlanRoutes from './plans.routes'
import ClientRoutes from './clients.routes'
import UserRoutes from './users.routes'
import MeasureRoutes from './measures.routes'

const Routes: React.FC = () => (
  <Switch>
    <>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      <PlanRoutes />
      <ClientRoutes />
      <UserRoutes />
      <MeasureRoutes />
    </>
  </Switch>
)

export default Routes
