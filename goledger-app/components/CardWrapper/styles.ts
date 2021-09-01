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
  box-shadow: 0 4.5px 3.6px rgba(0, 0, 0, 0.019),
    0 11.3px 9px rgba(0, 0, 0, 0.029), 0 23px 18.4px rgba(0, 0, 0, 0.037),
    0 47.5px 38px rgba(0, 0, 0, 0.047), 0 130px 104px rgba(0, 0, 0, 0.07);
`
