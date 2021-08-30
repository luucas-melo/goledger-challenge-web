import styled from 'styled-components'
// import Card from '@material-ui/core/Card'

export const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  width: 45%;
  min-width: 300px;
  padding: 12px;
  margin-bottom: 50px;

  h4 {
    color: ${props => props.theme.colors.linkActive};
  }
`

export const SecondaryP = styled.p`
  font-weight: 300;
  color: ${props => props.theme.colors.secondaryText};
  text-align: justify;
`
