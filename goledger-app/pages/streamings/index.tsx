import React, { useState } from 'react'
import { IAlbum, IArtist, IStreaming } from 'interfaces/assets'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { createAsset, deleteAsset, searchAsset } from 'services/assetsService'

// components
import Card from 'components/Card/index'
import { Button } from 'components/Button/styles'
import CustomFormField from 'components/CustomFormField'
import { FlexBox } from 'components/FlexBox/flex'
import { Form, FormButtons } from 'styles/form'
import { ButtonDiv } from 'styles/albums'
import Loader from 'components/Loader'
import { ModalConfirm } from 'components/Modal/styles'

// hooks
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Modal from 'components/Modal'

interface IStreamingProps {
  initialStreaming?: IStreaming[]
  artists?: IArtist[]
}

const Album = ({ initialStreaming }: IStreamingProps) => {
  const [registerModal, setRegisterModal] = useState<boolean>(false)

  const [streaming, setStreaming] = useState(initialStreaming)
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [deletedModal, setDeletedModal] = useState<string | any>(false)
  const { handleSubmit, register, errors } = useForm<IAlbum>()

  const onRegister = async streamingData => {
    setLoadingRegister(true)
    const data = await createAsset({
      '@assetType': 'streaming',
      ...streamingData
    })

    if (data[0]['@key']) {
      setStreaming([data[0], ...streaming])
    }
    setRegisterModal(false)
    setLoadingRegister(false)
  }

  const handleDelete = async (deletedStream: string) => {
    try {
      setLoadingDelete(true)
      const response = await deleteAsset(deletedStream)
      if (response['@key']) {
        const updatedStreaming = streaming.filter(
          artist => artist['@key'] !== deletedStream
        )
        setStreaming(updatedStreaming)
      }
      setDeletedModal(false)
      setLoadingDelete(false)
    } catch (error) {
      setDeletedModal(false)
      setLoadingDelete(false)
      return error
    }
  }

  const router = useRouter()
  return (
    <FlexBox flexDirection="column">
      <ButtonDiv>
        <Button onClick={() => setRegisterModal(true)}>
          Add new streaming
        </Button>
      </ButtonDiv>
      <FlexBox width="100%" flexWrap="wrap" justifyContent="space-between">
        {streaming?.map((stream, index) => (
          <Card
            key={index}
            title={stream.name}
            deleteAction={() => setDeletedModal(stream['@key'])}
          ></Card>
        ))}
      </FlexBox>
      <Modal onClose={() => setRegisterModal(false)} open={registerModal}>
        <Form id="register-form" onSubmit={handleSubmit(onRegister)}>
          <h1>Add new streaming </h1>
          <FlexBox justifyContent="center" flexDirection="column">
            <CustomFormField
              label="Name"
              name="name"
              errors={errors}
              inputRef={register({
                required: 'Required'
              })}
            />
          </FlexBox>
          <FormButtons>
            <Button
              type="button"
              small
              color="secondary"
              onClick={() => setRegisterModal(false)}
            >
              Cancel
            </Button>
            <Button small type="submit" form="regisConfirmter-form">
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
            <Button small onClick={() => handleDelete(deletedModal)}>
              {!loadingDelete ? 'Confirm' : <Loader size={20} />}
            </Button>
          </FormButtons>
        </ModalConfirm>
      </Modal>
    </FlexBox>
  )
}

export const getServerSideProps: GetServerSideProps<IStreamingProps> =
  async (): Promise<GetServerSidePropsResult<IStreamingProps>> => {
    const streaming = await searchAsset('streaming')

    return {
      props: {
        initialStreaming: streaming.result
      }
    }
  }

export default Album
