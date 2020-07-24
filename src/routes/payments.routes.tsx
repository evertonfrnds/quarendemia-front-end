import React from 'react'

import Route from './Route'

import ListPayments from '../pages/payments/ListPayments'

const PaymentRoutes: React.FC = () => (
  <>
    <Route path="/payments-list" component={ListPayments} isPrivate />
  </>
)

export default PaymentRoutes
