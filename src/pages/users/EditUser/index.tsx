import React, { useCallback, useRef, useEffect, useState } from 'react'
import { FiMail, FiUser, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

import getValidationErrors from '../../../utils/getValidationErrors'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { Container, Content, Form, FormControl } from './styles'
import Header from '../../../components/Header'
import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

interface EditUserFormData {
  name: string
  email: string
  password: string
  type: string
  is_active: boolean
}

interface HistoryStateProps {
  id: string
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState({} as EditUserFormData)
  const [isActive, setIsActive] = useState(true)
  const [type, setType] = useState('')

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const history = useHistory()
  const { state } = history.location
  const historyState = state as HistoryStateProps

  useEffect(() => {
    api.get(`/users/${historyState.id}`).then((response) => {
      const userData = response.data
      setUser(userData)
      setType(userData.type)
      setIsActive(userData.is_active)
    })
  }, [historyState.id])

  const handleChange = useCallback((event) => {
    setType(event.target.value)
  }, [])

  const handleChangeIsActive = useCallback((event) => {
    setIsActive(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (data: EditUserFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().min(6, 'Nome deve possuir pelo menos 6 dígitos'),
          email: Yup.string().required('E-mail obrigatório'),
          password: Yup.string(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        if (!type) {
          addToast({
            type: 'error',
            title: 'Erro durante a alteração do usuário',
            description: 'Você precisa selecionar o tipo de usuário',
          })

          return
        }

        if (!isActive) {
          addToast({
            type: 'error',
            title: 'Erro durante a alteração do usuário',
            description: 'Você precisa selecionar se o usuário está ativo',
          })

          return
        }

        const { name, email, password } = data

        const formData = {
          name,
          email,
          type,
          is_active: isActive,
          ...(password ? { password } : {}),
        }

        await api.put(`/users/${historyState.id}`, formData)

        history.push('/users-list')

        addToast({
          type: 'success',
          title: 'Usuário alterado com sucesso!',
          description: 'O usuário foi alterado com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro durante a alteração do usuário',
          description: 'Ocorreu um erro ao alterar o usuário, tente novamente',
        })
      }
    },
    [addToast, history, historyState.id, isActive, type],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
          <h1>Editar usuário</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            defaultValue={undefined}
          />
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Usuário
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={type}
              onChange={handleChange}
              label="Tipo de usuário"
            >
              <MenuItem value="">
                <em>Selecione o tipo de usuário</em>
              </MenuItem>
              <MenuItem value="common">Comum</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Usuário ativo?
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={isActive}
              onChange={handleChangeIsActive}
              label="Usuário ativo?"
            >
              <MenuItem value="">
                <em>Usuário ativo?</em>
              </MenuItem>
              <MenuItem value="true">Sim</MenuItem>
              <MenuItem value="false">Não</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default EditUser
