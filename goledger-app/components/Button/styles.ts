import styled from 'styled-components'

interface IButton {
  small?: boolean
  color?: string
}

export const Button = styled.button<IButton>`
  width: ${props => (props.small ? '110px' : '170px')};
  height: ${props => (props.small ? '32px' : '40px')};
  margin: 0 auto;
  color: white;
  border: none;
  border-radius: 0.2rem;
  font-family: Roboto;
  background-color: ${props =>
    props.color === 'yellow'
      ? props.theme.colors.secondaryButton.color
      : props.theme.colors.button.color};
  &:hover {
    background-color: ${props =>
      props.color === 'yellow'
        ? props.theme.colors.secondaryButton.hover
        : props.theme.colors.button.hover};
    cursor: pointer;
  }

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
