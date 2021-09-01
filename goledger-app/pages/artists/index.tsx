import React, { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { IArtist } from 'interfaces/assets'
import { createAsset, deleteAsset, searchAsset } from 'services/assetsService'
// components
import Card from 'components/Card/index'
import { FlexBox } from 'components/FlexBox/flex'
import { Button } from 'components/Button/styles'
import { Container } from './styles'
import Modal from 'components/Modal'
import { Form, FormButtons } from 'styles/form'
import { useForm } from 'react-hook-form'
import { Grid } from 'components/Grid/grid'
import CustomFormField from 'components/CustomFormField'
import Loader from 'components/Loader'
import { ModalConfirm } from 'components/Modal/styles'
import { useRouter } from 'next/router'

interface IArtistProps {
  initialArtists?: IArtist[]
  key?: string | string[]
}

// useEffect(() => { action?: React.FC
//   const artists = searchAsset('artist').then(data => console.log(data))
// }, [])
const Artist = ({ initialArtists }: IArtistProps) => {
  const { handleSubmit, register, errors } = useForm<IArtist>()

  const [artists, setArtists] = useState(initialArtists)

  const [registerArtist, setRegisterArtist] = useState(false)
  const [deletedModal, setDeletedModal] = useState<any>(false)

  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)

  const router = useRouter()

  const onRegister = async artistData => {
    setLoadingConfirm(true)
    try {
      const data = await createAsset({ '@assetType': 'artist', ...artistData })

      if (data[0]['@key']) {
        setArtists([data[0], ...artists])
      }
      setRegisterArtist(false)
      setLoadingConfirm(false)
    } catch (error) {
      setLoadingConfirm(false)
    }
  }

  const handleDelete = async (deletedArtist: string) => {
    try {
      setLoadingDelete(true)
      const response = await deleteAsset(deletedArtist)
      if (response['@key']) {
        const updatedArtists = artists.filter(
          artist => artist['@key'] !== deletedArtist
        )
        setArtists(updatedArtists)
      }
      setDeletedModal(false)
      setLoadingDelete(false)
    } catch (error) {
      setDeletedModal(false)
      setLoadingDelete(false)
      return error
    }
  }

  return (
    <FlexBox flexDirection="column">
      <Container>
        <Button onClick={() => setRegisterArtist(true)}>Add new artist</Button>
      </Container>
      <FlexBox width="100%" flexWrap="wrap" justifyContent="space-between">
        {artists?.map((artist, index) => (
          <Card
            key={index}
            title={artist.name}
            secondary={artist.description}
            main={artist.location}
            deleteAction={() => setDeletedModal(artist['@key'])}
            viewAction={() => router.push(`artists/${artist['@key']}`)}
          ></Card>
        ))}
      </FlexBox>
      <Modal onClose={() => setRegisterArtist(false)} open={registerArtist}>
        <Form id="register-form" onSubmit={handleSubmit(onRegister)}>
          <h1>Add New Artist </h1>
          <Grid
            columnsTemplate="1fr 1fr"
            rowsTemplate="1fr 1fr"
            gap="1rem"
            mediaColumns="1fr"
            mediaRows="1fr 1fr 1fr"
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
              label="Location"
              name="location"
              // icon={<MailOutlineIcon />}
              errors={errors}
              inputRef={register({
                required: 'Required'
              })}
            />
            <CustomFormField
              label="Description"
              name="description"
              // icon={<MailOutlineIcon />}
              multiline={true}
              errors={errors}
              inputRef={register({
                required: 'Required'
              })}
            />
          </Grid>
          <FormButtons>
            <Button
              type="button"
              small
              color="secondary"
              onClick={() => setRegisterArtist(false)}
            >
              Cancel
            </Button>
            <Button
              small
              type="submit"
              form="register-form"
              disabled={loadingConfirm}
            >
              {!loadingConfirm ? 'Confirm' : <Loader size={20} />}
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

export const getServerSideProps: GetServerSideProps<IArtistProps> = async ({
  query
}): Promise<GetServerSidePropsResult<IArtistProps>> => {
  const artists = await searchAsset('artist')

  return {
    props: {
      initialArtists: artists.result
    }
  }
}

export default Artist
