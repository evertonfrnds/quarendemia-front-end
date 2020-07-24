import React, { useState, useEffect, useCallback, useMemo } from 'react'

import { useConfirm } from 'material-ui-confirm'

import { Grid } from '@material-ui/core'
import { getMonth, getYear } from 'date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Table, { TableState } from '../../../components/Table'

import { Container, Content } from './styles'
import Header from '../../../components/Header'

import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

interface Payment {
  id: string
  name: string
  email: string
}

const ListPayments: React.FC = () => {
  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'client.name' },
      { title: 'E-mail', field: 'client.email' },
      {
        field: 'status',
        title: 'Status',
        render: () => <p>pago</p>,
      },
    ],
  })
  const [payments, setPayments] = useState<Payment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const selectedMonth = useMemo(() => {
    const month = getMonth(selectedDate || Date.now()) + 1
    return month
  }, [selectedDate])

  const selectedYear = useMemo(() => {
    const year = getYear(selectedDate || Date.now())
    return year
  }, [selectedDate])

  const confirm = useConfirm()

  const { addToast } = useToast()

  const getPayments = useCallback(() => {
    api.get(`/payments/${selectedMonth}/${selectedYear}`).then((response) => {
      setPayments(response.data)
    })
  }, [selectedYear, selectedMonth])

  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date)
  }, [])

  useEffect(() => {
    getPayments()
  }, [getPayments])

  const handleCancelPayment = useCallback(
    async (paymentId) => {
      await confirm({
        description: 'Deseja mesmo cancelar esse pagamento?',
        confirmationText: 'Sim',
        confirmationButtonProps: { color: 'primary', variant: 'contained' },
        cancellationText: 'Não',
      })
      try {
        await api.delete(`payments/${paymentId}`)

        addToast({
          type: 'success',
          title: 'Pagamento cancelado com sucesso!',
        })

        getPayments()
      } catch {
        addToast({
          type: 'error',
          title: 'Erro durante o cancelamento do pagamento',
          description:
            'Ocorreu um erro ao cancelar o pagamento, tente novamente',
        })
      }
    },
    [confirm, addToast, getPayments],
  )

  return (
    <Container>
      <Header />

      <Content>
        <NavSide />
        <Separator />

        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Selecione o mês"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Table
            title="Pagamentos recebidos"
            columns={tableColumn.columns}
            data={payments}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Cancelar pagamento',
                onClick: (_, rowData: Payment) => {
                  handleCancelPayment(rowData.id)
                },
              },
            ]}
          />
        </div>
      </Content>
    </Container>
  )
}

export default ListPayments
