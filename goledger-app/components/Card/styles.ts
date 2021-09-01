import styled from 'styled-components'
// import Card from '@material-ui/core/Card'

export const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  width: 47%;
  max-width: 600px;
  word-wrap: break-word;

  min-width: 300px;

  @media (max-width: 650px) {
    min-width: 200px;
  }
  padding: 1.5rem;
  margin-bottom: 50px;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
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
    &:hover {
      color: ${props => props.theme.colors.secondaryText};
    }
    &:first-child {
      margin-right: 10px;
    }
  }
`
