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
import { Grid } from 'components/Grid/grid'
import { FlexBox } from 'components/FlexBox/flex'
import Card from 'components/Card'
import { FormWrapper } from 'components/CustomFormField/styles'
import Loader from 'components/Loader'
interface IAlbumProps {
  artist?: IArtist
  albums: IAlbum[]
}

const Artist = ({ artist, albums }: IAlbumProps) => {
  const router = useRouter()

  const [editAvailable, setEditAvaiable] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

  const { handleSubmit, register, errors, reset } = useForm<IArtist>()

  const onUpdate = async (artistData: IArtist) => {
    setLoadingEdit(true)
    // @ts-ignore
    await updateAsset('artist', artist['@key'], artistData)
    setLoadingEdit(false)
    setEditAvaiable(false)
  }

  return (
    <CardWrapper arrowAction={() => router.push('/albums')}>
      <Form id="edit-form" onSubmit={handleSubmit(onUpdate)}>
        <FormHeader>
          <div>
            <h1>Artist Details</h1>
            {artist.name}, {artist.location}
          </div>
          <FlexBox flexDirection="column" justifyContent="space-between">
            {!editAvailable && (
              <Button
                small
                onClick={() => setEditAvaiable(!editAvailable)}
                type="button"
              >
                Edit artist
              </Button>
            )}
            {editAvailable && (
              <Button
                small
                // onClick={() => setEditAvaiable(!editAvailable)}
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
                  setEditAvaiable(!editAvailable)
                  reset()
                }}
              >
                Cancel
              </Button>
            ) : null}
          </FlexBox>
        </FormHeader>
        <FlexBox width="100%" justifyContent="center">
          <CustomFormField
            label="Description"
            name="description"
            defaultValue={artist.description}
            width="100%"
            maxRow={6}
            disabled={!editAvailable}
            errors={errors}
            multiline
            type="number"
            inputRef={register({
              required: 'Required'
            })}
          />
        </FlexBox>
        <FormButtons></FormButtons>
        <FormWrapper>
          <h4>Albums</h4>
          <FlexBox width="100%" flexWrap="wrap" justifyContent="space-between">
            {albums?.map((album, index) => (
              <Card
                title={album.name}
                main={album.genre}
                secondary={album.year}
              >
                <div key={index}></div>
              </Card>
            ))}
          </FlexBox>
        </FormWrapper>
      </Form>
    </CardWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const albums = await searchAsset('artist')

  const result = await albums.result

  // map data to an array of path objects - (key)
  const paths = result.map(artist => {
    return {
      params: { key: artist['@key'].toString() }
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
  const artist = await readAsset(params.key.toString())

  const albums = await searchAsset('album', {
    artist: {
      '@key': params.key.toString()
    }
  })

  return {
    props: {
      artist,
      albums: albums.result
    }
  }
}
export default Artist