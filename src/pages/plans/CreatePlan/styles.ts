import styled from 'styled-components'
import { Form as Unform } from '@unform/web'

export const Container = styled.div``

export const Content = styled.main`
  max-width: 1120px;
  margin: 34px auto;
  display: flex;
`

export const Form = styled(Unform)`
  margin: 0 auto;

  h1 {
    margin-bottom: 24px;
    font-size: 20px;
    text-align: left;
  }
`
