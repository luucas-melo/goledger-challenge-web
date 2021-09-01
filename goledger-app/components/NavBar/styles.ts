import styled from 'styled-components'

export const Navbar: any = styled.nav`
  height: 60px;
  background-color: ${props => props.theme.colors.header};
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  .MuiSvgIcon-root {
    font-size: 40px;
    color: ${props => props.theme.colors.mainColor};
  }
`

export const NavTitle = styled.h1`
  color: ${props => props.theme.colors.mainColor};
  font-size: 50px;

  @media (max-width: 650px) {
    font-size: 16px;
  }
`

export const NavLink = styled.a`
  color: ${props =>
    props.className === 'active'
      ? props.theme.colors.linkActive
      : props.theme.colors.link};
  font-weight: ${props => (props.className === 'active' ? '600' : 'normal')};
  border-bottom: ${props => (props.className === 'active' ? '2px' : '1px')}
    solid ${props => props.theme.colors.link};
  font-size: 17px;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.linkActive};
    font-weight: 600;
  }
`
