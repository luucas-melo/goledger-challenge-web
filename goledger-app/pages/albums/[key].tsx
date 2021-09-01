import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { IAlbum, IArtist } from 'interfaces/assets'
import { readAsset, searchAsset, updateAsset } from 'services/assetsService'

// components
import { Button } from 'components/Button/styles'
import CustomFormField from 'components/CustomFormField'
import CustomSelect from 'components/CustomSelect'
import CardWrapper from 'components/CardWrapper/'
import {
  FieldWrapper,
  Form,
  FormButtons,
  FormFooter,
  FormHeader
} from 'styles/form'
// hooks
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { CheckDiv } from './styles'
import { Grid } from 'components/Grid/grid'
import { FlexBox } from 'components/FlexBox/flex'
import Loader from 'components/Loader'

interface IAlbumProps {
  initialAlbum?: IAlbum
  artists: IArtist[]
}

const Album = ({ initialAlbum, artists }: IAlbumProps) => {
  const router = useRouter()

  const { key } = router.query

  const { handleSubmit, register, errors, reset } = useForm<IAlbum>()

  const [album, setAlbum] = useState<IAlbum>(initialAlbum)
  const [editAvailable, setEditAvailable] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

  const onEditAlbum = async (albumData: IAlbum) => {
    setLoadingEdit(true)
    albumData.artist = {
      // @ts-ignore
      '@key': albumData.artist
    }

    await updateAsset('album', key.toString(), albumData)

    const updatedAlbum = await readAsset(key.toString())

    setAlbum(updatedAlbum)
    setLoadingEdit(false)
    setEditAvailable(false)
  }

  return (
    <CardWrapper arrowAction={() => router.push('/albums')}>
      <Form id="edit-form" onSubmit={handleSubmit(onEditAlbum)}>
        <FormHeader>
          <div>
            <h1>Album Details</h1>
            {album.name}({album.year})
          </div>
          <FlexBox flexDirection="column" justifyContent="space-between">
            {!editAvailable && (
              <Button
                small
                onClick={() => setEditAvailable(!editAvailable)}
                type="button"
              >
                Edit album
              </Button>
            )}
            {editAvailable && (
              <Button
                small
                // onClick={() => setEditAvailable(!editAvailable)}
                type="submit"
                form="edit-form"
                disabled={loadingEdit}
              >
                {!loadingEdit ? 'Confirm' : <Loader size={20} />}
              </Button>
            )}
            {editAvailable ? (
              <Button
                small
                color={!editAvailable ? 'primary' : 'secondary'}
                onClick={() => {
                  setEditAvailable(!editAvailable)
                  reset()
                }}
              >
                Cancel
              </Button>
            ) : null}
          </FlexBox>
        </FormHeader>
        <Grid
          columnsTemplate="1fr 1fr"
          rowsTemplate="1fr 1fr"
          gap="1rem"
          mediaColumns="1fr"
          mediaRows="1fr 1fr 1fr 1fr"
        >
          <CustomFormField
            label="Genre"
            name="genre"
            width="240px"
            defaultValue={album.genre}
            disabled={!editAvailable}
            errors={errors}
            inputRef={register({
              required: 'Required'
            })}
          />
          <CustomFormField
            label="Number of tracks"
            name="nTracks"
            defaultValue={album.nTracks}
            disabled={!editAvailable}
            width="240px"
            errors={errors}
            type="number"
            inputRef={register({
              required: 'Required'
            })}
          />

          <CustomSelect
            name="artist"
            inputRef={register({ required: true })}
            disabled={!editAvailable}
          >
            <option value="">Select an artist </option>
            {artists.map(artist => (
              <option
                selected={album.artist['@key'] === artist['@key']}
                key={artist['@key']}
                value={artist['@key']}
              >
                {artist.name}
              </option>
            ))}
          </CustomSelect>
          <CheckDiv>
            <input
              type="checkbox"
              defaultChecked={album.explicit}
              disabled={!editAvailable}
              name="explicit"
              ref={register()}
            ></input>
            <label htmlFor="explicit">Explicit</label>
          </CheckDiv>
        </Grid>
        <FormFooter>
          <h4>Available in</h4>

          {album?.strOptions?.map((streaming, index) => (
            <div key={index}>{streaming.name}</div>
          ))}
        </FormFooter>
      </Form>
    </CardWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const albums = await searchAsset('album')

  const result = await albums.result

  // map data to an array of path objects - (key)
  const paths = result.map(album => {
    return {
      params: { key: album['@key'].toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({
  params
}): Promise<GetStaticPropsResult<any>> => {
  const album = await readAsset(params.key.toString())
  const artists = await searchAsset('artist')
  return {
    props: {
      initialAlbum: album,
      artists: artists.result
    }
  }
}
export default Album
