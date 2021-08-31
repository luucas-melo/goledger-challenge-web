import React, { useState } from 'react'
import { ButtonDiv, CheckDiv, IconContainer } from './styles'
import { IAlbum, IArtist } from 'interfaces/assets'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { createAsset, searchAsset } from 'services/assetsService'

// components
import Card from 'components/Card/index'
import { Button } from 'components/Button/styles'
import CustomFormField from 'components/CustomFormField'
import { FlexBox } from 'components/FlexBox/flex'
import MusicVideoIcon from '@material-ui/icons/MusicVideo'
import Dialog from '@material-ui/core/Dialog'
import { Form, FormButtons } from 'styles/form'

// hooks
import { useRouter } from 'next/router'
import { SecondaryP } from 'components/Card/styles'
import { useForm } from 'react-hook-form'
import CustomSelect from 'components/CustomSelect'
import Modal from 'components/Modal'
import { Grid } from 'components/Grid/grid'

interface IAlbumProps {
  album?: IAlbum[]
  artists?: IArtist[]
}

const Album = ({ album, artists }: IAlbumProps) => {
  const [registerAlbum, setRegisterAlbum] = useState<boolean>(false)

  const { handleSubmit, register, errors } = useForm<IAlbum>()

  const onRegister = async albumData => {
    console.log(albumData)
    albumData.artist = {
      '@key': albumData.artist
    }
    await createAsset({ '@assetType': 'album', ...albumData })
  }

  const router = useRouter()
  return (
    <FlexBox flexDirection="column">
      <ButtonDiv>
        <Button onClick={() => setRegisterAlbum(true)}>Add new album</Button>
      </ButtonDiv>
      <FlexBox width="100%" flexWrap="wrap" justifyContent="space-between">
        {album?.map((album, index) => (
          <Card
            key={index}
            title={album.name}
            secondary={album.year}
            main={album.genre}
            editAction={() => router.push(`/albums/${album['@key']}`)}
          >
            <IconContainer>
              <MusicVideoIcon fontSize="large" />
            </IconContainer>
          </Card>
        ))}
      </FlexBox>
      <Modal onClose={() => setRegisterAlbum(false)} open={registerAlbum}>
        <Form id="register-form" onSubmit={handleSubmit(onRegister)}>
          <h1>Add New Album </h1>
          <Grid
            columnsTemplate="1fr 1fr"
            rowsTemplate="1fr 1fr 1fr"
            gap="1rem"
            mediaColumns="1fr"
            mediaRows="1fr 1fr 1fr 1fr 1fr 1fr"
          >
            <CustomFormField
              label="Name"
              name="name"
              // icon={<MailOutlineIcon />}
              errors={errors}
              inputRef={register({
                required: 'Campo obrigatório'
              })}
            />

            <CustomFormField
              label="Genre"
              name="genre"
              // icon={<MailOutlineIcon />}
              errors={errors}
              inputRef={register({
                required: 'Campo obrigatório'
              })}
            />
            <CustomFormField
              label="Year"
              name="year"
              // icon={<MailOutlineIcon />}
              type="number"
              errors={errors}
              inputRef={register({
                required: 'Campo obrigatório'
              })}
            />
            <CustomFormField
              label="Number of tracks"
              name="nTracks"
              // icon={<MailOutlineIcon />}
              errors={errors}
              type="number"
              inputRef={register({
                required: 'Campo obrigatório'
              })}
            />

            <CustomSelect name="artist" inputRef={register({ required: true })}>
              <option>Select an artist</option>
              {artists.map(artist => (
                <option key={artist['@key']} value={artist['@key']}>
                  {artist.name}
                </option>
              ))}
            </CustomSelect>
            <CheckDiv>
              <input type="checkbox" name="explicit" ref={register()}></input>
              <label htmlFor="explicit">Explicit</label>
            </CheckDiv>
          </Grid>
          <FormButtons>
            <Button
              type="button"
              small
              color="yellow"
              onClick={() => setRegisterAlbum(false)}
            >
              Cancel
            </Button>
            <Button small type="submit" form="register-form">
              Confirm
            </Button>
          </FormButtons>
        </Form>
      </Modal>
    </FlexBox>
  )
}

export const getServerSideProps: GetServerSideProps<IAlbumProps> = async ({
  query
}): Promise<GetServerSidePropsResult<IAlbumProps>> => {
  const albums = await searchAsset('album')
  const artists = await searchAsset('artist')

  return {
    props: {
      album: albums.result,
      artists: artists.result
    }
  }
}

export default Album
