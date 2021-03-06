import React, { useCallback, useRef } from 'react'
import { FiInfo } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
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

interface CreatePlanFormData {
  name: string
  description: string
  value: string
}

const CreatePlan: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: CreatePlanFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do plano obrigatório'),
          description: Yup.string(),
          value: Yup.number().required('Valor do plano obrigatório'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const { name, description, value } = data

        const formData = {
          name,
          value,
          ...(description ? { description } : {}),
        }

        await api.post('/plans', formData)

        history.push('/plans-list')

        addToast({
          type: 'success',
          title: 'Plano cadastrado com sucesso!',
          description: 'O plano foi cadastrado com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro durante a criação do plano',
          description: 'Ocorreu um erro ao criar o plano, tente novamente',
        })
      }
    },
    [addToast, history],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastrar plano</h1>

          <Input name="name" icon={FiInfo} placeholder="Nome" />
          <Input name="description" icon={FiInfo} placeholder="Descrição" />
          <Input name="value" icon={MdAttachMoney} placeholder="Valor" />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default CreatePlan
