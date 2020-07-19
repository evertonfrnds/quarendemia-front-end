import React, { useEffect, useState } from 'react'

import { FiPower, FiUsers, FiFileText, FiEdit2, FiTrash } from 'react-icons/fi'
import { AiOutlineDashboard } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NavItem,
  MainContainer,
  MainTitle,
  Table,
  MainTable,
  SearchInput,
} from './styles'

import NavSide from '../../components/NavSide'
import Separator from '../../components/Separator'
import Modal from '../../components/Modal'

import { useAuth } from '../../hooks/auth'
import { useModal } from '../../hooks/modal'

export interface PropsNavItem {
  selected?: boolean
}

interface IResponse {
  id: string
  name: string
  description: string
  value: number
}

const Plans: React.FC = () => {
  const { signOut, user } = useAuth()
  const { isOpenRemove, isOpenEdit } = useModal()
  const [plans, setPlans] = useState<IResponse[]>([])

  const loadPlans = React.useCallback(async () => {
    const response = await api.get('/plans')
    await setPlans(response.data)
  }, [plans])

  React.useEffect(() => {
    loadPlans()
  }, [])

  return (
    <Container>
      <Modal title="Excluir plano" type="del" loadPlans={loadPlans}>
        <p>Deseja realmente excluir este plano?</p>
      </Modal>
      <Modal title="Editar plano" type="edit" loadPlans={loadPlans}>
        <form>
          <input type="text" placeholder="nome" />
        </form>
      </Modal>
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
          <NavItem>
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
          <NavItem selected>
            <Link to="/plans">
              <p>Planos</p>
              <FiFileText />
            </Link>
          </NavItem>
        </NavSide>
        <Separator />
        <MainContainer>
          <MainTitle>
            <div className="title">
              <h2>Planos</h2>
              <div className="separator" />
              <span>Lista de planos</span>
            </div>
            <SearchInput>
              <input type="text" placeholder="Pesquisar" />
            </SearchInput>
          </MainTitle>
          <MainTable>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>R$ {item.value}</td>
                      <td>
                        <div className="group-button">
                          <button
                            onClick={isOpenEdit}
                            type="button"
                            className="edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => isOpenRemove(item.id)}
                            type="button"
                            className="del"
                          >
                            <FiTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </MainTable>
        </MainContainer>
      </Content>
    </Container>
  )
}

export default Plans
