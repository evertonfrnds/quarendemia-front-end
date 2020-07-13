import React, { useState, useContext, createContext, useCallback } from 'react'

interface ModalContextData {
  isOpenAdd(): void
  isOpenRemove(id?: string): void
  modalAddIsOpen: boolean
  modalRemoveIsOpen: boolean
  cardId: string
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)
