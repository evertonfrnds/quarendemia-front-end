import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getMonth, getYear } from 'date-fns'

import { useConfirm } from 'material-ui-confirm'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import { MdAttachMoney } from 'react-icons/md'
import Table, { TableState } from '../../../components/Table'

import { Container, Content, Space } from './styles'
import Header from '../../../components/Header'

import NavSide from '../../../components/NavSide'
import Separator from '../../../components/Separator'

import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

interface Client {
  id: string
  name: string
  email: string
}

const Dashboard: React.FC = () => {
  const [tableColumn] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'E-mail', field: 'email' },
      {
        field: 'status',
        title: 'Status',
        render: () => <p>pendente</p>,
      },
    ],
  })
  const [clients, setClients] = useState<Client[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [totalPayment, setTotalPayment] = useState<number>(0)

  const { addToast } = useToast()

  const confirm = useConfirm()

  const selectedMonth = useMemo(() => {
    const month = getMonth(selectedDate || Date.now()) + 1
    return month
  }, [selectedDate])

  const selectedYear = useMemo(() => {
    const year = getYear(selectedDate || Date.now())
    return year
  }, [selectedDate])

  const getDebtors = useCallback(() => {
    api
      .get(`/due-clients/${selectedMonth}/${selectedYear}`)
      .then((response) => {
        setClients(response.data)
      })
  }, [selectedMonth, selectedYear])

  const getTotalPayment = useCallback(() => {
    api
      .get(`/payments/payment-total/${selectedMonth}/${selectedYear}`)
      .then((response) => {
        setTotalPayment(response.data)
      })
  }, [selectedMonth, selectedYear])

  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date)
  }, [])

  useEffect(() => {
    getDebtors()
    getTotalPayment()
  }, [getDebtors, getTotalPayment])

  const handlePayment = useCallback(
    async (clientId) => {
      await confirm({
        title: 'Atenção',
        description: 'Deseja mesmo confirmar esse pagamento?',
        confirmationText: 'Sim',
        confirmationButtonProps: { color: 'primary', variant: 'contained' },
        cancellationText: 'Não',
      })
      try {
        const payment = {
          client_id: clientId,
          month: selectedMonth,
          year: selectedYear,
        }

        await api.post(`payments`, payment)

        getDebtors()
      } catch {
        addToast({
          type: 'error',
          title: 'Erro durante a confirmação do pagamento',
          description:
            'Ocorreu um erro ao confirmar o pagamento, tente novamente',
        })
      }
    },
    [confirm, addToast, getDebtors, selectedYear, selectedMonth],
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
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Recebido do mês
                  </Typography>

                  <Typography variant="body2" component="p">
                    {totalPayment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </MuiPickersUtilsProvider>
          <Space />
          <Table
            title="Pagamentos a receber"
            columns={tableColumn.columns}
            data={clients}
            actions={[
              {
                icon: () => <MdAttachMoney />,
                tooltip: 'Save User',
                onClick: (_, rowData: Client) => {
                  handlePayment(rowData.id)
                },
              },
            ]}
          />
        </div>
      </Content>
    </Container>
  )
}

export default Dashboard
