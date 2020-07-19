import React from 'react'

import { FiPower, FiUsers, FiFileText, FiPlus } from 'react-icons/fi'
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
  Main,
  SearchInput,
  Table,
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
  email: string
}

const Clients: React.FC = () => {
  const { signOut, user } = useAuth()
  const { isOpenAdd } = useModal()
  const [clients, setClients] = React.useState<IResponse[]>([])

  React.useEffect(() => {
    async function loadClients(): Promise<void> {
      const response = await api.get('/clients')
      await setClients(response.data)
    }
    loadClients()
  }, [])

  // <Modal title="Novo cliente" type="add" />
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
              <button type="button" onClick={isOpenAdd}>
                <FiPlus size={20} />
              </button>
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
              <tbody>
                {clients.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Main>
        </MainContainer>
      </Content>
    </Container>
  )
}

export default Clients
