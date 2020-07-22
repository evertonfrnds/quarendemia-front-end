import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FiUsers, FiFileText } from 'react-icons/fi'
import { Container, NavItem } from './styles'

const NavSide: React.FC = () => {
  const [navItems, setNavItems] = useState([
    {
      name: 'Visão geral',
      link: '/dashboard',
      icon: <AiOutlineDashboard />,
      selected: false,
    },
    {
      name: 'Clientes',
      link: '/clients',
      icon: <FiUsers />,
      selected: false,
    },
    {
      name: 'Planos',
      link: '/plans-list',
      icon: <FiFileText />,
      selected: false,
    },
  ])

  const history = useHistory()

  useEffect(() => {
    const newNavItems = navItems

    newNavItems.forEach((navItem, index) => {
      if (navItem.link === history.location.pathname) {
        newNavItems[index].selected = true
      }
    })

    setNavItems(newNavItems)
  }, [navItems, history.location.pathname])

  return (
    <Container>
      {navItems.map((navItem) => (
        <NavItem key={navItem.name} selected={navItem.selected}>
          <Link to={navItem.link}>
            <p>{navItem.name}</p>
            {navItem.icon}
          </Link>
        </NavItem>
      ))}
    </Container>
  )
}

export default NavSide
