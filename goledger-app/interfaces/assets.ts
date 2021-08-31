export interface IArtist {
  '@assetType': string
  '@key': string
  name: string
  location?: string
  description?: string
}

export interface IAlbum {
  '@assetType': string
  name: string
  '@key': string
  year: string
  nTracks: number
  artist: IArtist | string
  genre?: string
  explicit?: string
  strOptions?: IStreaming[]
}
export interface IStreaming {
  '@assetType': string
  '@key': string
  name?: string
}

export type AssetsType = IArtist & IAlbum & IStreaming

export type SearchAssetType = {
  result: AssetsType[]
  metadata?: Object
}
