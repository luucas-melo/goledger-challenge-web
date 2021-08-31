import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

export const Container = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled(CircularProgress)`
  color: white;
`
