import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Content, Background } from './styles'

const SignIn: React.FC = () => {
  function handleSubmit(data: Object): void {
    console.log('43')
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="E-mail"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minhas senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
