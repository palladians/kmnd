import { useMemo } from 'react'
import { search } from 'fast-fuzzy'
import { gitCommands } from '../commands/git'
import { appCommands } from '../commands/app'
import { usePackageJson } from './usePackageJson'
import { useAppStore } from '../store/app'
import { shallow } from 'zustand/shallow'
import { createAppCommands } from '../commands/create-app'

export const useCommands = () => {
  const { query, setExecutableCommand } = useAppStore(
    (state) => ({
      query: state.query,
      setExecutableCommand: state.setExecutableCommand
    }),
    shallow
  )
  const { scripts } = usePackageJson()
  const commands = [...scripts, ...appCommands]
  const allCommands = [...commands, ...gitCommands, ...createAppCommands]
  const filteredCommands = useMemo(
    () =>
      query.length > 0
        ? search(query, commands, {
            keySelector: (entry: any) => entry.label
          })
        : commands,
    [commands, query]
  )
  const resultsCount = filteredCommands.length
  const setCommandForExecution = (value: string) => {
    const executableCommand = allCommands.find(
      (command) => command.value === value
    )
    if (!executableCommand) return
    setExecutableCommand(executableCommand)
  }
  return {
    filteredCommands,
    commands,
    resultsCount,
    setCommandForExecution
  }
}
