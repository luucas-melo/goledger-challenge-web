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
      <NavTitle>GoMusic</NavTitle>
      <FlexBox display="flex" justifyContent="space-around" width="100%">
        <NavLink
          className={router.asPath === '/?assetType=artist' ? 'active' : ''}
          onClick={() => router.push('/?assetType=artist')}
        >
          Artistas
        </NavLink>
        <NavLink
          className={router.asPath === '/?assetType=album' ? 'active' : ''}
          onClick={() => router.push('/?assetType=album')}
        >
          Albums
        </NavLink>
        <NavLink
          className={router.asPath === '/?assetType=streaming' ? 'active' : ''}
          onClick={() => router.push('/?assetType=streaming')}
        >
          Streaming
        </NavLink>
      </FlexBox>
    </Navbar>
  )
}

export default Header
