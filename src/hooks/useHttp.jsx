import { useCallback, useEffect, useState } from 'react'

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config)

  const responseJson = await response.json()

  if (!response.ok) {
    throw new Error(responseJson.message || 'Something went wrong...')
  }

  return responseJson
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(initialData)

  const sendRequest = useCallback(
    async function sendRequest(data) {
      try {
        setLoading(true)
        const res = await sendHttpRequest(url, { ...config, body: data })
        setData(res)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    },
    [url, config]
  )

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest()
    }
  }, [sendRequest, config])

  return {
    data,
    loading,
    error,
    sendRequest,
  }
}
