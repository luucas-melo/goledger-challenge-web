import styled from 'styled-components'
// import Card from '@material-ui/core/Card'

export const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  width: 47%;
  min-width: 300px;
  padding: 1.5rem;
  margin-bottom: 50px;
  background-color: white;

  h4 {
    color: ${props => props.theme.colors.linkActive};
  }
`

export const SecondaryP = styled.p`
  font-weight: 300;
  color: ${props => props.theme.colors.secondaryText};
  text-align: justify;
`

export const IconDiv = styled.div`
  .MuiSvgIcon-root {
    cursor: pointer;
    &:first-child {
      margin-right: 10px;
    }
  }
`