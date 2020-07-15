import React from 'react'

import { FiXCircle } from 'react-icons/fi'

import { Container, Content } from './styles'

import api from '../../services/api'

import { useModal } from '../../hooks/modal'

interface IProps {
  title: string
  type: string
}

const Modal: React.FC<IProps> = ({ children, title, type }) => {
  const {
    isOpenAdd,
    isOpenRemove,
    modalAddIsOpen,
    modalRemoveIsOpen,
    cardId,
  } = useModal()

  async function handleDelete(): Promise<void> {
    await api.delete(`plans/${cardId}`)
    isOpenRemove()
  }

  return (
    <>
      <Container
        isOpen={type === 'add' ? modalAddIsOpen : modalRemoveIsOpen}
        onRequestClose={() => (modalAddIsOpen ? isOpenAdd() : isOpenRemove())}
        style={{
          overlay: {
            backgroundColor: 'rgba(40, 38, 46, 0.8)',
          },
        }}
      >
        <Content>
          <div className="header">
            <div className="title">{title}</div>

            <button
              type="button"
              onClick={() => (modalAddIsOpen ? isOpenAdd() : isOpenRemove())}
            >
              <FiXCircle color="#f04747" size={22} />
            </button>
          </div>
          <div className="content">{children}</div>
          <div className="group-button">
            <button type="button" onClick={handleDelete}>
              Excluir
            </button>
          </div>
        </Content>
      </Container>
    </>
  )
}

export default Modal
