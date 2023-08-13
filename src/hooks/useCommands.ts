import { useMemo } from 'react'
import { search } from 'fast-fuzzy'
import { gitCommands } from '../commands/git'
import { appCommands } from '../commands/app'
import { usePackageJson } from './usePackageJson'
import { useAppStore } from '../store/app'
import { shallow } from 'zustand/shallow'
import { createAppCommands } from '../commands/create-app'

export const useCommands = () => {
  const { query, setExecutableCommand, setQuery } = useAppStore(
    (state) => ({
      query: state.query,
      setExecutableCommand: state.setExecutableCommand,
      setQuery: state.setQuery
    }),
    shallow
  )
  const { scripts } = usePackageJson()
  const commands = useMemo(
    () => [...scripts, ...gitCommands, ...createAppCommands, ...appCommands],
    [scripts, gitCommands, createAppCommands, appCommands]
  )
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
    const executableCommand = commands.find(
      (command) => command.value === value
    )
    if (!executableCommand) return
    setExecutableCommand(executableCommand)
    setQuery('')
  }
  return {
    filteredCommands,
    commands,
    resultsCount,
    setCommandForExecution
  }
}
