import React, { useState, useEffect, useCallback } from 'react'

import { FiPower, FiUsers, FiFileText } from 'react-icons/fi'
import { AiOutlineDashboard } from 'react-icons/ai'
import { Link, useHistory } from 'react-router-dom'

import Table, { TableState } from '../../../components/Table'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NavItem,
} from './styles'

import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

import { useAuth } from '../../../hooks/auth'
import api from '../../../services/api'

export interface PropsNavItem {
  selected?: boolean
}

interface Plan {
  id: string
  name: string
  description: string
  value: number
}

const ListPlans: React.FC = () => {
  const { signOut, user } = useAuth()

  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Descrição', field: 'description' },
      { title: 'Valor', field: 'value', type: 'numeric' },
    ],
  })
  const [plans, setPlans] = useState<Plan[]>([])

  const history = useHistory()

  useEffect(() => {
    api.get(`/plans`).then((response) => {
      setPlans(response.data)
    })
  }, [])

  const handleNavigateToCreate = useCallback(() => {
    history.push('plans-create')
  }, [history])

  const handleNavigateToEdit = useCallback(
    (planId: string) => {
      history.push('plans-edit', { id: planId })
    },
    [history],
  )

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
            <Link to="/plans">
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
              onClick: handleNavigateToCreate,
            },
            {
              icon: 'edit',
              tooltip: 'Save User',
              onClick: (_, rowData: Plan) => {
                handleNavigateToEdit(rowData.id)
              },
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

export default ListPlans
