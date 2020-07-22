import React, { useState, useEffect } from 'react'

import Table, { TableState } from '../../components/Table'

import { Container, Content } from './styles'
import Header from '../../components/Header'

import NavSide from '../../components/NavSide'
import Separator from '../../components/Separator'

import api from '../../services/api'

interface Plan {
  name: string
  description: string
  value: number
}

const Dashboard: React.FC = () => {
  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Descrição', field: 'description' },
      { title: 'Valor', field: 'value', type: 'numeric' },
    ],
  })
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    api.get(`/plans`).then((response) => {
      setPlans(response.data)
    })
  }, [])

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Table
          title="Planos"
          columns={tableColumn.columns}
          data={plans}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: () => alert('You want to add a new row'),
            },
            {
              icon: 'edit',
              tooltip: 'Save User',
              onClick: () => alert(`You saved`),
            },
            {
              icon: 'delete',
              tooltip: 'Save User',
              onClick: () => alert(`You saved`),
            },
          ]}
        />
      </Content>
    </Container>
  )
}

export default Dashboard
