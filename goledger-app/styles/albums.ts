import styled from 'styled-components'

export const ButtonDiv = styled.div`
  button {
    margin-left: 0;
    margin-bottom: 2rem;
  }
`
export const IconContainer = styled.div`
  .MuiSvgIcon-fontSizeLarge {
    font-size: 9rem;
  }
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

export const StreamingDiv = styled.div`
  .MuiSvgIcon-fontSizeLarge {
    font-size: 9rem;
  }
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

export const CheckDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0;
`
