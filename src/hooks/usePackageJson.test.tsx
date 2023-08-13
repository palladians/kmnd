import { renderHook } from '@testing-library/react'
import { usePackageJson } from './usePackageJson'

it('fetches package.json', () => {
  const { result } = renderHook(() => usePackageJson())
  expect(result.current.scripts).toEqual([])
})
