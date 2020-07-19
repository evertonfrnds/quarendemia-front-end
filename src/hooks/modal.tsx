import React, { useState, useContext, createContext, useCallback } from 'react'

interface ModalContextData {
  isOpenAdd(): void
  isOpenEdit(): void
  isOpenRemove(id?: string): void
  modalAddIsOpen: boolean
  modalEditIsOpen: boolean
  modalRemoveIsOpen: boolean
  cardId: string
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

const ModalProvider: React.FC = ({ children }) => {
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [cardId, setCardId] = useState('')

  const isOpenAdd = useCallback(() => {
    setModalAddIsOpen(!modalAddIsOpen)
  }, [modalAddIsOpen])

  const isOpenEdit = useCallback(() => {
    setModalEditIsOpen(!modalEditIsOpen)
  }, [modalEditIsOpen])

  const isOpenRemove = useCallback(
    (id) => {
      setModalRemoveIsOpen(!modalRemoveIsOpen)
      setCardId(id)
    },
    [modalRemoveIsOpen],
  )
  const value = React.useMemo(
    () => ({
      isOpenAdd,
      isOpenRemove,
      isOpenEdit,
      modalAddIsOpen,
      modalEditIsOpen,
      modalRemoveIsOpen,
      cardId,
    }),
    [
      isOpenAdd,
      isOpenRemove,
      modalAddIsOpen,
      modalRemoveIsOpen,
      cardId,
      isOpenEdit,
      modalEditIsOpen,
    ],
  )
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function useModal(): ModalContextData {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used whithin a ModalProvider')
  }
  return context
}

export { ModalProvider, useModal }
