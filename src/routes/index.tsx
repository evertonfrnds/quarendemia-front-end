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
<<<<<<< HEAD
import UserRoutes from './users.routes'
import MeasureRoutes from './measures.routes'
=======
>>>>>>> bb38d0bc1d8b83159ddc67c15a84e2e8245c72f2

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
<<<<<<< HEAD
      <UserRoutes />
      <MeasureRoutes />
=======
>>>>>>> bb38d0bc1d8b83159ddc67c15a84e2e8245c72f2
    </>
  </Switch>
)

export default Routes
