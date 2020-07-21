import React, { TableHTMLAttributes, useState } from 'react'
import MaterialTable, { Column } from 'material-table'

interface TableProps extends TableHTMLAttributes<HTMLInputElement> {
  columns: Array<Column<Object>>
  data: Array<Object>
  actions: Array<ActionProps>
}

interface ActionProps {
  icon: string
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
      actions={actions}
      data={data}
      columns={tableColumn.columns}
      options={{
        actionsColumnIndex: -1,
      }}
      {...rest}
    />
  )
}

export default Table
