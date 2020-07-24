import React, { useState, useEffect, useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import { useConfirm } from 'material-ui-confirm'

import Table, { TableState } from '../../../components/Table'

import { Container, Content } from './styles'
import Header from '../../../components/Header'

import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

interface Plan {
  id: string
  name: string
  description: string
  value: number
}

const ListPlans: React.FC = () => {
  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Descrição', field: 'description' },
      { title: 'Valor', field: 'value', type: 'numeric' },
    ],
  })
  const [plans, setPlans] = useState<Plan[]>([])

  const history = useHistory()
  const confirm = useConfirm()

  const { addToast } = useToast()

  const getPlans = useCallback(() => {
    api.get(`/plans`).then((response) => {
      setPlans(response.data)
    })
  }, [])

  useEffect(() => {
    getPlans()
  }, [getPlans])

  const handleNavigateToCreate = useCallback(() => {
    history.push('plans-create')
  }, [history])

  const handleNavigateToEdit = useCallback(
    (planId: string) => {
      history.push('plans-edit', { id: planId })
    },
    [history],
  )

  const handleDeleteItem = useCallback(
    async (planId) => {
      await confirm({
        title: 'Atenção',
        description: 'Deseja mesmo excluir o plano selecionado?',
        confirmationText: 'Sim',
        confirmationButtonProps: { color: 'primary', variant: 'contained' },
        cancellationText: 'Não',
      })
      try {
        await api.delete(`plans/${planId}`)

        getPlans()
      } catch {
        addToast({
          type: 'error',
          title: 'Erro durante a exclusão do plano',
          description: 'Ocorreu um erro ao excluir o plano, tente novamente',
        })
      }
    },
    [confirm, addToast, getPlans],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Table
          title="Planos"
          columns={tableColumn.columns}
          data={plans}
          actions={[
            {
              icon: 'add',
              tooltip: 'Adicionar plano',
              isFreeAction: true,
              onClick: handleNavigateToCreate,
            },
            {
              icon: 'edit',
              tooltip: 'Editar plano',
              onClick: (_, rowData: Plan) => {
                handleNavigateToEdit(rowData.id)
              },
            },
            {
              icon: 'delete',
              tooltip: 'Deletar plano',
              onClick: (_, rowData: Plan) => {
                handleDeleteItem(rowData.id)
              },
            },
          ]}
        />
      </Content>
    </Container>
  )
}

export default ListPlans
