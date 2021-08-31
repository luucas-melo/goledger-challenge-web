import styled from 'styled-components'

export const CardContent = styled.div`
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 10px;
  .MuiSvgIcon-root {
    position: relative;
    left: 1rem;
    top: 1rem;
    color: ${props => props.theme.colors.link};
    &:hover {
      color: ${props => props.theme.colors.linkActive};
      cursor: pointer;
    }
  }
`
