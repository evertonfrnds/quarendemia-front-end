import React, { useCallback, useRef, useState, useEffect } from 'react'
import { FiMail, FiUser } from 'react-icons/fi'
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

interface CreateClientFormData {
  name: string
  email: string
  plan_id: string
}

interface Plan {
  id: string
  name: string
<<<<<<< HEAD
  description: string
=======
  deion: string
>>>>>>> bb38d0bc1d8b83159ddc67c15a84e2e8245c72f2
  value: number
}

const CreateClient: React.FC = () => {
  const [plan, setPlan] = useState('')
  const [plans, setPlans] = useState<Plan[]>([])

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const getPlans = useCallback(() => {
    api.get(`/plans`).then((response) => {
      setPlans(response.data)
    })
  }, [])

  useEffect(() => {
    getPlans()
  }, [getPlans])

  const handleChange = useCallback((event) => {
    setPlan(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (data: CreateClientFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().min(
            6,
            'Nome deve possuir pelo menos 6 caracteres',
          ),
          email: Yup.string()
            .required('Descrição do plano obrigatória')
            .email('E-mail digitado não é válido'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        if (!plan) {
          addToast({
            type: 'error',
            title: 'Erro durante a criação do cliente',
<<<<<<< HEAD
            description: 'Você precisa selecionar um plano para o cliente',
=======
            deion: 'Você precisa selecionar um plano para o cliente',
>>>>>>> bb38d0bc1d8b83159ddc67c15a84e2e8245c72f2
          })

          return
        }

        const clientData = Object.assign(data, { plan_id: plan })

        await api.post('/clients', clientData)

        history.push('/clients-list')

        addToast({
          type: 'success',
          title: 'Cliente cadastrado com sucesso!',
<<<<<<< HEAD
          description: 'O cliente foi cadastrado com sucesso!',
=======
          deion: 'O cliente foi cadastrado com sucesso!',
>>>>>>> bb38d0bc1d8b83159ddc67c15a84e2e8245c72f2
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro durante a criação do cliente',
<<<<<<< HEAD
          description: 'Ocorreu um erro ao criar o cliente, tente novamente',
=======
          deion: 'Ocorreu um erro ao criar o cliente, tente novamente',
>>>>>>> bb38d0bc1d8b83159ddc67c15a84e2e8245c72f2
        })
      }
    },
    [addToast, history, plan],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastrar cliente</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Plano
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={plan}
              onChange={handleChange}
              label="Plano"
            >
              <MenuItem value="">
                <em>Selecione um plano</em>
              </MenuItem>
              {plans.map((planItem) => (
                <MenuItem key={planItem.id} value={planItem.id}>
                  {planItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default CreateClient
