import { BASE_URL } from './baserURL'
import { AssetsType, SearchAssetType } from 'interfaces/assets'

export const createAsset = async (payload: AssetsType) => {
  const body = {
    asset: [payload]
  }
  try {
    const data = await fetch(`${BASE_URL}invoke/createAsset`, {
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

export const readAsset = async (key: string) => {
  const body = {
    key: {
      '@key': key
    }
  }
  console.log(body)
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
  assetType: string | string[] | undefined
): Promise<SearchAssetType> => {
  const body = {
    query: {
      selector: {
        '@assetType': assetType
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

export const updateAsset = async (key, payload: AssetsType) => {
  const body = {
    update: { '@key': key, ...payload }
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

    return data
  } catch (err) {
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

    return data
  } catch (err) {
    return err
  }
}
