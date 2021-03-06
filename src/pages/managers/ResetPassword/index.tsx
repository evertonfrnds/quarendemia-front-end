import React, { useRef, useCallback } from 'react'
import { FiLogIn, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { useToast } from '../../../hooks/toast'

import getValidationErrors from '../../../utils/getValidationErrors'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { Container, Content, AnimationContainer, Background } from './styles'
import api from '../../../services/api'
import quarendemia from '../../../assets/quarendemia.png'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()
  const location = useLocation()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Senhas não coincidem',
          ),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        })

        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro ao alterar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        })
      }
    },
    [history, addToast, location.search],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={quarendemia} alt="quarendemia" style={{ height: 250 }} />

            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
