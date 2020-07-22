import React from 'react'
import { Link } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'
import { Container, HeaderContent, Profile } from './styles'

const Header: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
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
    </Container>
  )
}

export default Header
