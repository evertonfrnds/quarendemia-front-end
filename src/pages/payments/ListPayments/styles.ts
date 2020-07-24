import styled from 'styled-components'
import { FormControl as FormControlElement } from '@material-ui/core'

export const Container = styled.div``

export const Content = styled.main`
  max-width: 1120px;
  margin: 34px auto;
  display: flex;
`

export const FormControl = styled(FormControlElement)`
  width: 100%;
  background: #232129;
  margin-bottom: 20px !important;
`

export const Space = styled.div`
  margin-top: 30px;
`
