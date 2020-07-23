import React from 'react'

import Route from './Route'

import ListUsers from '../pages/users/ListUsers'
import CreateUser from '../pages/users/CreateUser'
import EditUser from '../pages/users/EditUser'

const UserRoutes: React.FC = () => (
  <>
    <Route path="/users-list" component={ListUsers} isPrivate />
    <Route path="/users-create" component={CreateUser} isPrivate />
    <Route path="/users-edit" component={EditUser} isPrivate />
  </>
)

export default UserRoutes
