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
      const data = JSON.parse((await readFileAsync(packageJsonPath)).toString())
      setPackageJson(data)
    }
    fetchPackageJson()
  }, [packageJsonPath, packageJsonPathLoading])
  const packageName = useMemo(() => packageJson?.['name'], [packageJson])
  const scripts =
    useMemo(
      () =>
        packageJson &&
        Object.keys(packageJson?.['scripts']).map((key) => ({
          label: `· ${packageName} → ${key}`,
          value: `${packageName}_${key}`,
          command: `npm run ${key}`
        })),
      [packageJson]
    ) || []
  return {
    scripts
  }
}
