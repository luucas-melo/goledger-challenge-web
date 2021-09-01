import React, { useContext } from 'react'
import { Navbar, NavLink, NavTitle } from './styles'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FlexBox } from 'components/FlexBox/flex'
const Header: React.FC = () => {
  const router = useRouter()
  return (
    <Navbar>
      <MusicNoteIcon />
      <NavTitle onClick={() => router.push('/artists')}>GoMusic</NavTitle>
      <FlexBox display="flex" justifyContent="space-around" width="100%">
        <NavLink
          className={router.asPath.includes('/artists') ? 'active' : ''}
          onClick={() => router.push('/artists')}
        >
          Artists
        </NavLink>
        <NavLink
          className={router.asPath.includes('/albums') ? 'active' : ''}
          onClick={() => router.push('/albums')}
        >
          Albums
        </NavLink>
        <NavLink
          className={router.asPath.includes('/streamings') ? 'active' : ''}
          onClick={() => router.push('/streamings')}
        >
          Streaming
        </NavLink>
      </FlexBox>
    </Navbar>
  )
}

export default Header
