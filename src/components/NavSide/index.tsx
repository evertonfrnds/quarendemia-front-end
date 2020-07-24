import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FiUsers, FiFileText } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
import { Container, NavItem } from './styles'
import { useAuth } from '../../hooks/auth'

const NavSide: React.FC = () => {
  const { user } = useAuth()

  const [navItems, setNavItems] = useState([
    {
      name: 'Visão geral',
      link: '/dashboard',
      icon: <AiOutlineDashboard />,
      selected: false,
      visible: true,
    },
    {
      name: 'Usuários',
      link: '/users-list',
      icon: <FiUsers />,
      selected: false,
      visible: user.type === 'admin',
    },
    {
      name: 'Planos',
      link: '/plans-list',
      icon: <FiFileText />,
      selected: false,
      visible: true,
    },
    {
      name: 'Clientes',
      link: '/clients-list',
      icon: <FiUsers />,
      selected: false,
      visible: true,
    },
    {
      name: 'Pagamentos',
      link: '/payments-list',
      icon: <MdAttachMoney />,
      selected: false,
      visible: true,
    },
  ])

  const history = useHistory()

  useEffect(() => {
    const newNavItems = navItems

    newNavItems.forEach((navItem, index) => {
      if (navItem.link.includes(history.location.pathname.split('-')[0])) {
        newNavItems[index].selected = true
      }
    })

    setNavItems(newNavItems)
  }, [navItems, history.location.pathname])

  return (
    <Container>
      {navItems.map((navItem) =>
        navItem.visible === true ? (
          <NavItem key={navItem.name} selected={navItem.selected}>
            <Link to={navItem.link}>
              <p>{navItem.name}</p>
              {navItem.icon}
            </Link>
          </NavItem>
        ) : null,
      )}
    </Container>
  )
}

export default NavSide
