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
} from './styles'
import NavSide from '../../components/NavSide'
import Separator from '../../components/Separator'

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

const Default: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>evertonfrnds</strong>
              </Link>
            </div>
          </Profile>

          <button type="button">
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
            <Link to="/profile">
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
              <h2>Plano</h2>
              <div className="separator" />
              <span>Detalhes</span>
            </div>
          </MainTitle>
          <Main />
        </MainContainer>
      </Content>
    </Container>
  )
}

export default Default
