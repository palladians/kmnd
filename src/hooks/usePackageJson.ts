import { useEffect, useMemo, useState } from 'react'
import { usePromise } from './usePromise'
import { findUp } from 'find-up'
import { readFileAsync } from '../utils/readFileAsync'

export const usePackageJson = () => {
  const [packageJson, setPackageJson] = useState<Record<string, any> | null>(
    null
  )
  const { data: packageJsonPath, loading: packageJsonPathLoading } = usePromise(
    () => findUp('package.json')
  )
  useEffect(() => {
    const fetchPackageJson = async () => {
      if (packageJsonPathLoading) return
      if (!packageJsonPath) return
      const data = JSON.parse((await readFileAsync(packageJsonPath)).toString())
      setPackageJson(data as Record<string, any>)
    }
    fetchPackageJson()
  }, [packageJsonPath, packageJsonPathLoading])
  const packageName = useMemo(() => packageJson?.['name'], [packageJson])
  const scripts =
    useMemo(() => {
      if (!packageJson) return
      return Object.keys(packageJson?.['scripts']).map((key) => {
        const scriptComment = packageJson?.['comments']?.['scripts']?.[key]
        const label = scriptComment
          ? `· ${packageName} → ${key} → ${scriptComment}`
          : `· ${packageName} → ${key}`
        return {
          label,
          value: `${packageName}_${key}`,
          command: `npm run ${key}`
        }
      })
    }, [packageJson]) || []
  return {
    scripts
  }
}
