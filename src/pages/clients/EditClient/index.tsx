import React, { useCallback, useRef, useEffect, useState } from 'react'
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

interface EditClientFormData {
  name: string
  description: string
  value: string
}

interface HistoryStateProps {
  id: string
}

interface Plan {
  id: string
  name: string
  description: string
  value: number
}

const EditClient: React.FC = () => {
  const [client, setClient] = useState({} as EditClientFormData)
  const [plan, setPlan] = useState('')
  const [plans, setPlans] = useState<Plan[]>([])

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const history = useHistory()
  const { state } = history.location
  const historyState = state as HistoryStateProps

  const getPlans = useCallback(() => {
    api.get(`/plans`).then((response) => {
      setPlans(response.data)
    })
  }, [])

  const getClients = useCallback(() => {
    api.get(`/clients/${historyState.id}`).then((response) => {
      const clientResponse = response.data
      setClient(clientResponse)
      setPlan(clientResponse.plan.id)
    })
  }, [historyState.id])

  useEffect(() => {
    getPlans()
    getClients()
  }, [getPlans, getClients])

  const handleChange = useCallback((event) => {
    setPlan(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (data: EditClientFormData) => {
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
            title: 'Erro durante a alteração do cliente',
            description: 'Você precisa selecionar um plano para o cliente',
          })

          return
        }

        const clientData = Object.assign(data, { plan_id: plan })

        await api.put(`/clients/${historyState.id}`, clientData)

        history.push('/clients-list')

        addToast({
          type: 'success',
          title: 'Cliente alterado com sucesso!',
          description: 'O cliente foi alterado com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro durante a alteração do cliente',
          description: 'Ocorreu um erro ao alterar o cliente, tente novamente',
        })
      }
    },
    [addToast, history, historyState.id, plan],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Form initialData={client} ref={formRef} onSubmit={handleSubmit}>
          <h1>Editar cliente</h1>

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
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default EditClient
