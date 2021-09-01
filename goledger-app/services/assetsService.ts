import { BASE_URL } from './baserURL'
import { AssetsType, SearchAssetType } from 'interfaces/assets'
import { toast } from 'react-toastify'

export const createAsset = async (
  payload: AssetsType
): Promise<AssetsType[]> => {
  const body = {
    asset: [payload]
  }
  try {
    const response = await fetch(`${BASE_URL}invoke/createAsset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (response.status === 409) {
      toast.error(`this ${payload['@assetType']} already exists `)
    } else {
      const data = await response.json()
      toast.success(`${payload['@assetType']} created successfully`)
      return data
    }
  } catch (err) {
    toast.error(`an error occurred while creating  ${payload['@assetType']} `)
    return err
  }
}

export const readAsset = async (key: string): Promise<AssetsType> => {
  const body = {
    key: {
      '@key': key
    }
  }
  try {
    const data = await fetch(`${BASE_URL}query/readAsset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
    return data
  } catch (err) {
    return err
  }
}
export const searchAsset = async (
  assetType: string,
  payload?
): Promise<SearchAssetType> => {
  const body = {
    query: {
      selector: {
        '@assetType': assetType,
        ...payload
      }
    }
  }
  try {
    const response = await fetch(`${BASE_URL}query/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const updateAsset = async (
  assetType: 'album' | 'streaming' | 'artist',
  key: string,
  payload: AssetsType
): Promise<AssetsType> => {
  const body = {
    update: { '@assetType': assetType, '@key': key, ...payload }
  }

  try {
    const data = await fetch(`${BASE_URL}invoke/updateAsset`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(res => res.json())
    toast.success(`${assetType} updated successfully`)
    return data
  } catch (err) {
    toast.error(`it was not possible to edit the ${assetType} `)
    return err
  }
}

export const deleteAsset = async key => {
  const body = {
    key: { '@key': key }
  }

  try {
    const data = await fetch(`${BASE_URL}invoke/deleteAsset`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
    toast.success(`deleted successfully ;)`)
    return data
  } catch (err) {
    toast.error(`it was not possible to delete `)
    return err
  }
}
