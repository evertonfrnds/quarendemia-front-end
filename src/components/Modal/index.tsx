import React from 'react'

import { FiXCircle } from 'react-icons/fi'

import { Container, Content } from './styles'

interface IProps {
  title: string
  type: string
}

const Modal: React.FC = () => {
  return (
    <>
      <Container isOpen>
        <Content>
          <div className="header">
            <div className="title">Titulo</div>
            <button type="button">
              <FiXCircle color="#f04747" size={22} />
            </button>
          </div>
          <div className="content">mensagem</div>
          <div className="group-button">
            <button type="button">Excluir</button>
          </div>
        </Content>
      </Container>
    </>
  )
}

export default Modal
