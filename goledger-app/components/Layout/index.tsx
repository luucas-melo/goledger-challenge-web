import React from 'react'
import Navbar from 'components/NavBar'
import { Main } from './styles'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
    </>
  )
}

export default Layout
