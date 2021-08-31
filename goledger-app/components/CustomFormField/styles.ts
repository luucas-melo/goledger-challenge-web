import styled from 'styled-components'
import { TextField } from '@material-ui/core'

export const FormField = styled(TextField).attrs(
  (props: { width: string }) => ({
    width: props.width
  })
)`
  width: ${props => props.width || '300px'};
  margin-top: 1rem;
  & label.Mui-focused {
    color: ${props => props.theme.colors.link};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${props => props.theme.colors.link};
    }
  }
`

export const InputError = styled.span`
  color: ${props => props.theme.colors.button};
  font-size: 14px;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
