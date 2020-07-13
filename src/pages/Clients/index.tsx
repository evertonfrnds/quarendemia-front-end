import React from 'react'

import { FiPower, FiUsers, FiFileText } from 'react-icons/fi'
import { AiOutlineDashboard } from 'react-icons/ai'
import { Link } from 'react-router-dom'
// import api from '../../services/api'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NavItem,
  MainContainer,
  MainTitle,
  Main,
  SearchInput,
  Table,
} from './styles'
import NavSide from '../../components/NavSide'
import Separator from '../../components/Separator'
import { useAuth } from '../../hooks/auth'

export interface PropsNavItem {
  selected?: boolean
}

interface IParams {
  id: string
}

interface IPlanData {
  id: string
  name: string
  description: string
  value: number
}

const Clients: React.FC = () => {
  const { signOut, user } = useAuth()

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

          <button type="button" onClick={() => signOut}>
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
          <NavItem selected>
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
        <MainContainer>
          <MainTitle>
            <div className="title">
              <h2>Clientes</h2>
              <div className="separator" />
              <span>Lista de clientes</span>
            </div>
            <SearchInput>
              <input type="text" placeholder="Pesquisar" />
            </SearchInput>
          </MainTitle>
          <Main>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>
              </thead>
            </Table>
          </Main>
        </MainContainer>
      </Content>
    </Container>
  )
}

export default Clients
