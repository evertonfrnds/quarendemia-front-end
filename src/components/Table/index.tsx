import React, { TableHTMLAttributes, useState } from 'react'
import MaterialTable, { Column } from 'material-table'

interface TableProps extends TableHTMLAttributes<HTMLInputElement> {
  columns: Array<Column<Object>>
  data: Array<Object>
  actions: Array<ActionProps>
}

interface ActionProps {
  icon: any
  tooltip: string
  isFreeAction?: boolean
  onClick(event: Event, rowData: Object): void
}

export interface TableState {
  columns: Array<Column<Object>>
}

const Table: React.FC<TableProps> = ({ columns, data, actions, ...rest }) => {
  const [tableColumn] = useState<TableState>({
    columns,
  })

  return (
    <MaterialTable
      style={{ minWidth: 600, background: '#28262e' }}
      actions={actions}
      data={data}
      columns={tableColumn.columns}
      options={{
        actionsColumnIndex: -1,
        headerStyle: {
          backgroundColor: '#28262e',
          color: '#fff',
        },
      }}
      {...rest}
    />
  )
}

export default Table
