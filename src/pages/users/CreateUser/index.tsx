import React, { useCallback, useRef, useState } from 'react'
import { FiMail, FiUser, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { InputLabel, Select, MenuItem } from '@material-ui/core'
import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

import getValidationErrors from '../../../utils/getValidationErrors'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { Container, Content, Form, FormControl } from './styles'
import Header from '../../../components/Header'
import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

interface CreateUserFormData {
  name: string
  email: string
  password: string
}

const CreateUser: React.FC = () => {
  const [type, setType] = useState('')

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleChange = useCallback((event) => {
    setType(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (data: CreateUserFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().min(
            6,
            'Nome deve possuir pelo menos 6 caracteres',
          ),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(
            6,
            'Senha deve possuir pelo menos 6 caracteres',
          ),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        if (!type) {
          addToast({
            type: 'error',
            title: 'Erro durante a criação do usuário',
            description: 'Você precisa selecionar o tipo de usuário',
          })

          return
        }

        const userData = Object.assign(data, { type })

        await api.post('/users', userData)

        history.push('/users-list')

        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso!',
          description: 'O usuário foi cadastrado com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro durante a criação do usuário',
          description: 'Ocorreu um erro ao criar o usuário, tente novamente',
        })
      }
    },
    [addToast, history, type],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastrar usuário</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} placeholder="Senha" />
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Usuário
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={type}
              onChange={handleChange}
              label="Plano"
            >
              <MenuItem value="">
                <em>Selecione o tipo de usuário</em>
              </MenuItem>
              <MenuItem value="common">Comum</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default CreateUser
