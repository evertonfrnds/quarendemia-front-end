import React, { useCallback, useRef, useEffect, useState } from 'react'
import { FiMail, FiUser } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

import getValidationErrors from '../../../utils/getValidationErrors'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { Container, Content, Form } from './styles'
import Header from '../../../components/Header'
import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

interface EditPlanFormData {
  name: string
  description: string
  value: string
}

interface HistoryStateProps {
  id: string
}

const EditPlan: React.FC = () => {
  const [plan, setPlan] = useState({} as EditPlanFormData)

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const history = useHistory()
  const { state } = history.location
  const historyState = state as HistoryStateProps

  useEffect(() => {
    api.get(`/plans/${historyState.id}`).then((response) => {
      setPlan(response.data)
    })
  }, [historyState.id])

  const handleSubmit = useCallback(
    async (data: EditPlanFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do plano obrigatório'),
          description: Yup.string().required('Descrição do plano obrigatória'),
          value: Yup.number().required('Valor do plano obrigatório'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.put(`/plans/${historyState.id}`, data)

        history.push('/plans-list')

        addToast({
          type: 'success',
          title: 'Plano alterado com sucesso!',
          description: 'O plano foi alterado com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro durante a alteração do plano',
          description: 'Ocorreu um erro ao alterar o plano, tente novamente',
        })
      }
    },
    [addToast, history, historyState.id],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Form initialData={plan} ref={formRef} onSubmit={handleSubmit}>
          <h1>Editar plano</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="description" icon={FiMail} placeholder="Descrição" />
          <Input name="value" icon={FiMail} placeholder="Valor" />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default EditPlan
