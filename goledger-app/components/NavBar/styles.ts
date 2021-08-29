import styled from 'styled-components'

export const Navbar: any = styled.nav`
  height: 80px;
  background-color: ${props => props.theme.colors.header};
  width: 100%;
  display: flex;
  align-items: center;

  .MuiSvgIcon-root {
    font-size: 40px;
    color: ${props => props.theme.colors.mainColor};
  }
`

export const NavTitle = styled.h1`
  color: ${props => props.theme.colors.mainColor};
  font-size: 70px;
`

export const NavLink = styled.a`
  color: ${props =>
    props.className === 'active'
      ? props.theme.colors.linkActive
      : props.theme.colors.link};
  border-bottom: 1px solid ${props => props.theme.colors.link};
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.linkActive};
  font-size: 1rem;
`
