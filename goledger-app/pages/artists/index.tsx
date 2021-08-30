import React from 'react'
import { useFetch } from 'hooks/useFetch'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { IArtist, SearchAssetType } from 'interfaces/assets'
import { searchAsset } from 'services/assetsService'
import Card from 'components/Card/index'
import { FlexBox } from 'components/FlexBox/flex'
import { Button } from 'components/Button/styles'
import { Container } from './styles'

interface IArtistProps {
  artists?: IArtist[]
  key?: string | string[]
}

// useEffect(() => { action?: React.FC
//   const artists = searchAsset('artist').then(data => console.log(data))
// }, [])
const Artist = ({ artists }: IArtistProps) => {
  return (
    <FlexBox flexDirection="column">
      <Container>
        <Button>Add new artist</Button>
      </Container>
      <FlexBox width="100%" flexWrap="wrap" justifyContent="space-between">
        {artists?.map(artist => (
          <Card
            title={artist.name}
            secondary={artist.description}
            main={artist.location}
          ></Card>
        ))}
      </FlexBox>
    </FlexBox>
  )
}

export const getServerSideProps: GetServerSideProps<IArtistProps> = async ({
  query
}): Promise<GetServerSidePropsResult<IArtistProps>> => {
  const artists = await searchAsset('artist')

  return {
    props: {
      artists: artists.result
    }
  }
}

export default Artist
