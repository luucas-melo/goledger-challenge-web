import { BASE_URL } from 'services/baserURL'
import useSWR from 'swr'

export function useFetch<Data = any, Error = any>(endpoint: string) {
  const { data, error, mutate } = useSWR<Data, Error>(
    endpoint,
    async endpoint => {
      const response = await fetch(`${BASE_URL}${endpoint}`)
      const data = await response.json()
      return data
    }
  )

  return { data, error, mutate }
}
