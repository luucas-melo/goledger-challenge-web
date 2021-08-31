import styled from 'styled-components'
import { NativeSelect } from '@material-ui/core'

export const Select = styled(NativeSelect).attrs(
  (props: { width: string }) => ({
    width: props.width
  })
)`
  width: ${props => props.width || '240px'};
  &.MuiInput-underline:after {
    border-bottom: 2px solid ${props => props.theme.colors.button};
  }
  @media (max-width: 650px) {
    margin-bottom: 2rem;
  }
`
