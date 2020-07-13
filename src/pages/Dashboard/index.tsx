import React from 'react'

import { FiPower, FiUsers, FiFileText } from 'react-icons/fi'
import { AiOutlineDashboard } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NavItem,
  MainContainer,
  MainTable,
  MainCards,
  Table,
} from './styles'

import NavSide from '../../components/NavSide'
import Separator from '../../components/Separator'

import { useAuth } from '../../hooks/auth'

export interface PropsNavItem {
  selected?: boolean
}

const Dashboard: React.FC = () => {
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
        <MainContainer>
          <MainTable>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
                <tr>
                  <td>Everton Fernandes</td>
                  <td>evertonfrnds@gmail.com</td>
                  <td>but1 but2</td>
                </tr>
              </tbody>
            </Table>
          </MainTable>
          <MainCards />
        </MainContainer>
      </Content>
    </Container>
  )
}

export default Dashboard
