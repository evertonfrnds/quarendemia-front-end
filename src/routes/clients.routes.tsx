import React from 'react'

import Route from './Route'

import ListClients from '../pages/clients/ListClients'
import CreateClient from '../pages/clients/CreateClient'
import EditClient from '../pages/clients/EditClient'

const ClientRoutes: React.FC = () => (
  <>
    <Route path="/clients-list" component={ListClients} isPrivate />
    <Route path="/clients-create" component={CreateClient} isPrivate />
    <Route path="/clients-edit" component={EditClient} isPrivate />
  </>
)

export default ClientRoutes
