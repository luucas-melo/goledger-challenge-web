import React, { useState } from 'react'
import { ButtonDiv, CheckDiv, IconContainer } from './styles'
import { IAlbum, IArtist } from 'interfaces/assets'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { createAsset, deleteAsset, searchAsset } from 'services/assetsService'

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
import { ModalConfirm } from 'components/Modal/styles'
import Loader from 'components/Loader'

interface IAlbumProps {
  initialAlbum?: IAlbum[]
  artists?: IArtist[]
}

const Album = ({ initialAlbum, artists }: IAlbumProps) => {
  const [album, setAlbum] = useState(initialAlbum)

  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false)
  const [deletedModal, setDeletedModal] = useState<any>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const { handleSubmit, register, errors } = useForm<IAlbum>()

  const onRegister = async albumData => {
    setLoadingRegister(true)
    albumData.artist = {
      '@key': albumData.artist
    }
    console.log(albumData)
    const data = await createAsset({ '@assetType': 'album', ...albumData })
    setLoadingRegister(false)
    setRegisterModal(false)
    if (data[0]['@key']) {
      setAlbum([data[0], ...album])
    }
  }

  const handleDelete = async (deletedAlbum: string) => {
    try {
      setLoadingDelete(true)
      const response = await deleteAsset(deletedAlbum)
      if (response['@key']) {
        const updatedAlbum = album.filter(
          album => album['@key'] !== deletedAlbum
        )
        setAlbum(updatedAlbum)
      }
      setDeletedModal(false)
      setLoadingDelete(false)
    } catch (error) {
      setDeletedModal(false)
      setLoadingDelete(false)
      console.log(error)
    }
  }

  const router = useRouter()
  return (
    <FlexBox flexDirection="column">
      <ButtonDiv>
        <Button onClick={() => setRegisterModal(true)}>Add new album</Button>
      </ButtonDiv>
      <FlexBox width="100%" flexWrap="wrap" justifyContent="space-between">
        {album?.map((album, index) => (
          <Card
            key={index}
            title={album.name}
            secondary={album.year}
            main={album.genre}
            viewAction={() => router.push(`/albums/${album['@key']}`)}
            deleteAction={() => setDeletedModal(album['@key'])}
          >
            <IconContainer>
              <MusicVideoIcon fontSize="large" />
            </IconContainer>
          </Card>
        ))}
      </FlexBox>
      <Modal onClose={() => setRegisterModal(false)} open={registerModal}>
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
                required: 'Required'
              })}
            />

            <CustomFormField
              label="Genre"
              name="genre"
              // icon={<MailOutlineIcon />}
              errors={errors}
              inputRef={register({
                required: 'Required'
              })}
            />
            <CustomFormField
              label="Year"
              name="year"
              // icon={<MailOutlineIcon />}
              type="number"
              errors={errors}
              inputRef={register({
                required: 'Required'
              })}
            />
            <CustomFormField
              label="Number of tracks"
              name="nTracks"
              // icon={<MailOutlineIcon />}
              errors={errors}
              type="number"
              inputRef={register({
                required: 'Required'
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
              color="secondary"
              onClick={() => setRegisterModal(false)}
            >
              Cancel
            </Button>
            <Button
              small
              type="submit"
              form="register-form"
              disabled={loadingRegister}
            >
              {!loadingRegister ? 'Confirm' : <Loader size={20} />}
            </Button>
          </FormButtons>
        </Form>
      </Modal>
      <Modal onClose={() => setDeletedModal(false)} open={!!deletedModal}>
        <ModalConfirm>
          <p>Are you sure you want to delete this artist?</p>
          <FormButtons>
            <Button
              color="secondary"
              small
              onClick={() => setDeletedModal(false)}
            >
              Cancel
            </Button>
            <Button
              small
              onClick={() => handleDelete(deletedModal)}
              disabled={loadingDelete}
            >
              {!loadingDelete ? 'Confirm' : <Loader size={20} />}
            </Button>
          </FormButtons>
        </ModalConfirm>
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
      initialAlbum: albums.result,
      artists: artists.result
    }
  }
}

export default Album
