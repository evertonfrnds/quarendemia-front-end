import React, { useState, useEffect } from 'react'

import { FiPower, FiUsers, FiFileText } from 'react-icons/fi'
import { AiOutlineDashboard } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import Table, { TableState } from '../../components/Table'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NavItem,
} from './styles'

import NavSide from '../../components/NavSide'
import Separator from '../../components/Separator'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

export interface PropsNavItem {
  selected?: boolean
}

interface Plan {
  name: string
  description: string
  value: number
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  const [tableColumn, setTableColumn] = useState<TableState>({
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
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <NavSide>
          <NavItem selected>
            <Link to="/dashboard">
              <p>Visão geral</p>
              <AiOutlineDashboard />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/clients">
              <p>Clientes</p>
              <FiUsers />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/plans-list">
              <p>Planos</p>
              <FiFileText />
            </Link>
          </NavItem>
        </NavSide>
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
