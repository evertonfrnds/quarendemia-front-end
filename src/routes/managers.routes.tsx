import React from 'react'

import Route from './Route'

import SignIn from '../pages/managers/SignIn'
import SignUp from '../pages/managers/SignUp'
import ForgotPassword from '../pages/managers/ForgotPassword'
import ResetPassword from '../pages/managers/ResetPassword'

import Profile from '../pages/managers/Profile'

const ManagerRoutes: React.FC = () => (
  <>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/profile" component={Profile} isPrivate />
  </>
)

export default ManagerRoutes
