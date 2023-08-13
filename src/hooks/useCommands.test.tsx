import { renderHook } from '@testing-library/react'
import { useCommands } from './useCommands'
import { appCommands } from '../commands/app'

it('fetches commands', () => {
  const { result } = renderHook(() => useCommands())
  expect(result.current.commands).toContain(appCommands[0])
})
