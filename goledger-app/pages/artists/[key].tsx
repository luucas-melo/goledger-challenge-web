import React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { IAlbum } from 'interfaces/assets'
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

interface IAlbumProps {
  album?: IAlbum
}

const Album = ({ album }: IAlbumProps) => {
  const router = useRouter()
  const { key } = router.query
  const { handleSubmit, register, errors } = useForm<IAlbum>()

  const onEditAlbum = async (albumData: IAlbum) => {
    await updateAsset(key, albumData)
  }

  return (
    <CardWrapper arrowAction={() => router.push('/albums')}>
      <Form id="edit-form" onSubmit={handleSubmit(onEditAlbum)}>
        <FormHeader>
          <h1>Edit album</h1>
          {album.name}({album.year})
        </FormHeader>
        {/* <CustomFormField
            label="Name"
            name="name"
            // icon={<MailOutlineIcon />}
            errors={errors}
            defaultValue={edited?.name}
            inputRef={register({
              required: 'Campo obrigatório'
            })}
          /> */}
        <FieldWrapper>
          <CustomFormField
            label="Genre"
            name="genre"
            width="240px"
            defaultValue={album.genre}
            errors={errors}
            inputRef={register({
              required: 'Campo obrigatório'
            })}
          />
          {/* <CustomFormField
            label="Year"
            name="year"
        
            type="number"
            errors={errors}
            defaultValue={edited?.year}
            inputRef={register({
              required: 'Campo obrigatório'
            })}
          /> */}
          <CustomFormField
            label="Number of tracks"
            name="nTracks"
            defaultValue={album.nTracks}
            width="240px"
            errors={errors}
            type="number"
            inputRef={register({
              required: 'Campo obrigatório'
            })}
          />
        </FieldWrapper>
        <FormButtons>
          {/* <Button
            type="button"
            small
            color="secondary"
            // onClick={() => setEdited(null)}
          >
            Cancel
          </Button> */}
          <Button type="submit" form="edit-form">
            Confirm
          </Button>
        </FormButtons>
        <FormFooter>
          <h4>Available in</h4>

          {album.strOptions.map((streaming, index) => (
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

  return {
    props: {
      album
    }
  }
}
export default Album
