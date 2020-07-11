import React from 'react'

import { FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Container, Header, HeaderContent, Profile, Content } from './styles'

import { useAuth } from '../../hooks/auth'

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

      <Content />
    </Container>
  )
}

export default Dashboard
