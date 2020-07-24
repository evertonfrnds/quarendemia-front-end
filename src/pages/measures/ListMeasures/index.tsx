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

interface Measure {
  id: string
  height: string
  weight: string
}

interface HistoryStateProps {
  client_id: string
}

const ListMeasures: React.FC = () => {
  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Altura', field: 'height', type: 'numeric' },
      { title: 'Peso', field: 'weight', type: 'numeric' },
    ],
  })
  const [measures, setMeasures] = useState<Measure[]>([])

  const history = useHistory()
  const { state } = history.location
  const historyState = state as HistoryStateProps

  const confirm = useConfirm()

  const { addToast } = useToast()

  const getMeasures = useCallback(() => {
    api
      .get(`/measures?client_id=${historyState.client_id}`)
      .then((response) => {
        setMeasures(response.data)
      })
  }, [historyState.client_id])

  useEffect(() => {
    getMeasures()
  }, [getMeasures])

  const handleNavigateToCreate = useCallback(() => {
    history.push('measures-create', { client_id: historyState.client_id })
  }, [history, historyState.client_id])

  const handleNavigateToEdit = useCallback(
    (measureId: string) => {
      history.push('measures-edit', {
        id: measureId,
        client_id: historyState.client_id,
      })
    },
    [history, historyState.client_id],
  )

  const handleDeleteItem = useCallback(
    async (measureId) => {
      await confirm({
        title: 'Atenção',
        description: 'Deseja mesmo excluir a medida selecionado?',
        confirmationText: 'Sim',
        confirmationButtonProps: { color: 'primary', variant: 'contained' },
        cancellationText: 'Não',
      })
      try {
        await api.delete(`measures/${measureId}`)

        addToast({
          type: 'success',
          title: 'Medida excluída com sucesso',
          description: 'O medida foi excluída.',
        })

        getMeasures()
      } catch {
        addToast({
          type: 'error',
          title: 'Erro durante a exclusão da medida',
          description: 'Ocorreu um erro ao excluir a medida, tente novamente',
        })
      }
    },
    [confirm, addToast, getMeasures],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Table
          title="Medidas"
          columns={tableColumn.columns}
          data={measures}
          actions={[
            {
              icon: 'add',
              tooltip: 'Adicionar medidas',
              isFreeAction: true,
              onClick: handleNavigateToCreate,
            },
            {
              icon: 'edit',
              tooltip: 'Editar medida',
              onClick: (_, rowData: Measure) => {
                handleNavigateToEdit(rowData.id)
              },
            },
            {
              icon: 'delete',
              tooltip: 'Deletar medida',
              onClick: (_, rowData: Measure) => {
                handleDeleteItem(rowData.id)
              },
            },
          ]}
        />
      </Content>
    </Container>
  )
}

export default ListMeasures
