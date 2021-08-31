import React from 'react'
import { DialogModal } from './styles'
import DialogContent from '@material-ui/core/DialogContent'

interface IDialog {
  children?: React.ReactNode
  onClose: () => void
  open: boolean
}

const Modal: React.FC<IDialog> = ({ children, onClose, open }: IDialog) => {
  return (
    <DialogModal
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>{children}</DialogContent>
    </DialogModal>
  )
}

export default Modal
