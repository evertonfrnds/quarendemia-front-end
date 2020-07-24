import React, { useCallback, useRef, useEffect, useState } from 'react'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { FaRuler } from 'react-icons/fa'
import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

import getValidationErrors from '../../../utils/getValidationErrors'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { Container, Content, Form } from './styles'
import Header from '../../../components/Header'
import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

interface EditMeasureFormData {
  client_id: string
  height: number
  weight: number
  neck: number
  torax_top: number
  torax_bottom: number
  bust: number
  waist: number
  abdomen: number
  hip: number
  thigh_left: number
  thigh_right: number
  calf_left: number
  calf_right: number
  arm_left: number
  arm_right: number
  forearm_left: number
  forearm_right: number
}

interface HistoryStateProps {
  id: string
  client_id: string
}

const EditMeasure: React.FC = () => {
  const [measure, setMeasure] = useState({} as EditMeasureFormData)

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const history = useHistory()
  const { state } = history.location
  const historyState = state as HistoryStateProps

  const getMeasures = useCallback(() => {
    api.get(`/measures/${historyState.id}`).then((response) => {
      const measureResponse = response.data
      setMeasure(measureResponse)
    })
  }, [historyState.id])

  useEffect(() => {
    getMeasures()
  }, [getMeasures])

  const handleSubmit = useCallback(
    async (data: EditMeasureFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          height: Yup.number().min(100, 'Altura mínima de 100 cm'),
          weight: Yup.number().min(20, 'Peso mínimo de 20 quilos'),
          neck: Yup.number(),
          torax_top: Yup.number(),
          torax_bottom: Yup.number(),
          bust: Yup.number(),
          waist: Yup.number(),
          abdomen: Yup.number(),
          hip: Yup.number(),
          thigh_left: Yup.number(),
          thigh_right: Yup.number(),
          calf_left: Yup.number(),
          calf_right: Yup.number(),
          arm_left: Yup.number(),
          arm_right: Yup.number(),
          forearm_left: Yup.number(),
          forearm_right: Yup.number(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const measureData = Object.assign(data, {
          client_id: historyState.client_id,
        })

        await api.put(`/measures/${historyState.id}`, measureData)

        history.push('/measures-list', { client_id: historyState.client_id })

        addToast({
          type: 'success',
          title: 'Medida alterada com sucesso!',
          description: 'A medida foi alterada com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro durante a alteração da medida',
          description: 'Ocorreu um erro ao alterar a medida, tente novamente',
        })
      }
    },
    [addToast, history, historyState.id, historyState.client_id],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Form initialData={measure} ref={formRef} onSubmit={handleSubmit}>
          <h1>Editar medição</h1>

          <Input name="height" icon={FaRuler} placeholder="Altura (cm)" />
          <Input name="weight" icon={FaRuler} placeholder="Peso (cm)" />
          <Input name="neck" icon={FaRuler} placeholder="Pescoço" />
          <Input name="torax_top" icon={FaRuler} placeholder="Tórax superior" />
          <Input
            name="torax_bottom"
            icon={FaRuler}
            placeholder="Tórax inferior"
          />
          <Input name="bust" icon={FaRuler} placeholder="Peito" />
          <Input name="waist" icon={FaRuler} placeholder="Cintura" />
          <Input name="abdomen" icon={FaRuler} placeholder="Abdômen" />
          <Input name="hip" icon={FaRuler} placeholder="quadril" />
          <Input name="thigh_left" icon={FaRuler} placeholder="Coxa esquerda" />
          <Input name="thigh_right" icon={FaRuler} placeholder="Coxa direita" />
          <Input
            name="calf_left"
            icon={FaRuler}
            placeholder="Panturrilha esquerda"
          />
          <Input
            name="calf_right"
            icon={FaRuler}
            placeholder="Panturrilha direita"
          />
          <Input name="arm_left" icon={FaRuler} placeholder="Braço esquerdo" />
          <Input name="arm_right" icon={FaRuler} placeholder="Braço direito" />
          <Input
            name="forearm_left"
            icon={FaRuler}
            placeholder="Antebraço esquerdo"
          />
          <Input
            name="forearm_right"
            icon={FaRuler}
            placeholder="Antebraço direito"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default EditMeasure
