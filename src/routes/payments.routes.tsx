import React from 'react'

import Route from './Route'

import ListPayments from '../pages/payments/ListPayments'
import CreatePayment from '../pages/payments/CreatePayment'
import EditPayment from '../pages/payments/EditPayment'

const PaymentRoutes: React.FC = () => (
  <>
    <Route path="/payments-list" component={ListPayments} isPrivate />
    <Route path="/payments-create" component={CreatePayment} isPrivate />
    <Route path="/payments-edit" component={EditPayment} isPrivate />
  </>
)

export default PaymentRoutes
