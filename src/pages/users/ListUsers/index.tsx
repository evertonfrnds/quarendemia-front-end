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

interface User {
  id: string
  name: string
  email: string
  type: number
}

const ListUsers: React.FC = () => {
  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'E-mail', field: 'email' },
      { title: 'Tipo', field: 'type' },
    ],
  })
  const [users, setUsers] = useState<User[]>([])

  const history = useHistory()
  const confirm = useConfirm()

  const { addToast } = useToast()

  const getUsers = useCallback(() => {
    api.get(`/users`).then((response) => {
      setUsers(response.data)
    })
  }, [])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleNavigateToCreate = useCallback(() => {
    history.push('users-create')
  }, [history])

  const handleNavigateToEdit = useCallback(
    (userId: string) => {
      history.push('users-edit', { id: userId })
    },
    [history],
  )

  const handleDeleteItem = useCallback(
    async (userId) => {
      await confirm({
        title: 'Atenção',
        description: 'Deseja mesmo bloquear o usuário selecionado?',
        confirmationText: 'Sim',
        confirmationButtonProps: { color: 'primary', variant: 'contained' },
        cancellationText: 'Não',
      })
      try {
        await api.delete(`users/${userId}`)

        addToast({
          type: 'success',
          title: 'Usuário bloqueado com sucesso',
          description:
            'O usuário foi bloqueado, e não pode mais acessar o sistema.',
        })

        getUsers()
      } catch {
        addToast({
          type: 'error',
          title: 'Erro durante o bloqueio do usuário',
          description: 'Ocorreu um erro ao bloquear o usuário, tente novamente',
        })
      }
    },
    [confirm, addToast, getUsers],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />
        <Table
          title="Usuários"
          columns={tableColumn.columns}
          data={users}
          actions={[
            {
              icon: 'add',
              tooltip: 'Adicionar usuário',
              isFreeAction: true,
              onClick: handleNavigateToCreate,
            },
            {
              icon: 'edit',
              tooltip: 'Editar usuário',
              onClick: (_, rowData: User) => {
                handleNavigateToEdit(rowData.id)
              },
            },
            {
              icon: 'delete',
              tooltip: 'Deletar usuário',
              onClick: (_, rowData: User) => {
                handleDeleteItem(rowData.id)
              },
            },
          ]}
        />
      </Content>
    </Container>
  )
}

export default ListUsers
