import React, { useState, useEffect, useCallback } from 'react'
import { FaRuler } from 'react-icons/fa'

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

const ListClients: React.FC = () => {
  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Plano', field: 'plan.name' },
    ],
  })
  const [clients, setClients] = useState<Plan[]>([])

  const history = useHistory()
  const confirm = useConfirm()

  const { addToast } = useToast()

  const getClients = useCallback(() => {
    api.get(`/clients`).then((response) => {
      setClients(response.data)
    })
  }, [])

  useEffect(() => {
    getClients()
  }, [getClients])

  const handleNavigateToCreate = useCallback(() => {
    history.push('clients-create')
  }, [history])

  const handleNavigateToEdit = useCallback(
    (clientId: string) => {
      history.push('clients-edit', { id: clientId })
    },
    [history],
  )

  const handleNavigateToMeasures = useCallback(
    (clientId: string) => {
      history.push('measures-list', { client_id: clientId })
    },
    [history],
  )

  const handleDeleteItem = useCallback(
    async (clientId) => {
      await confirm({
        title: 'Atenção',
        description: 'Deseja mesmo bloquear o cliente selecionado?',
        confirmationText: 'Sim',
        confirmationButtonProps: { color: 'primary', variant: 'contained' },
        cancellationText: 'Não',
      })
      try {
        await api.delete(`clients/${clientId}`)

        getClients()
      } catch {
        addToast({
          type: 'error',
          title: 'Erro durante o bloqueio do cliente',
          description: 'Ocorreu um erro ao bloquear o cliente, tente novamente',
        })
      }
    },
    [confirm, addToast, getClients],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Table
          title="Clientes"
          columns={tableColumn.columns}
          data={clients}
          actions={[
            {
              icon: 'Add',
              tooltip: 'Adicionar cliente',
              isFreeAction: true,
              onClick: handleNavigateToCreate,
            },
            {
              icon: () => <FaRuler />,
              tooltip: 'Ver medições',
              onClick: (_, rowData: Plan) => {
                handleNavigateToMeasures(rowData.id)
              },
            },
            {
              icon: 'edit',
              tooltip: 'Editar cliente',
              onClick: (_, rowData: Plan) => {
                handleNavigateToEdit(rowData.id)
              },
            },
            {
              icon: 'delete',
              tooltip: 'Deletar cliente',
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

export default ListClients
