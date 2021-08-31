import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'

export const DialogModal = styled(Dialog)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .MuiIconButton-root {
    position: absolute;
    top: 1px;
    right: 1px;
  }
  h3 {
    margin-bottom: 1rem;
  }

  .MuiDialogContent-root:first-child {
    overflow-y: hidden;
    min-height: 220px;
    min-width: 300px;
  }
  .MuiDialog-paperWidthSm {
    max-width: 100vw;
  }
`

export const ModalConfirm = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 4rem;
  }
`
