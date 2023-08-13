import { useEffect, useState } from 'react'

export const usePromise = (promise: () => Promise<any>) => {
  const [data, setData] = useState<null | any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setData(await promise())
      setLoading(false)
    }
    fetchData()
    return () => {
      setData(null)
    }
  }, [])
  return { data, loading }
}
