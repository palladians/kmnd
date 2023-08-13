import { useEffect } from 'react'
import { useAppStore } from '../store/app'
import { shallow } from 'zustand/shallow'
import { AppAction, Route } from '../types'
import { useApp } from 'ink'
import { execa } from 'execa'

export const useExecute = () => {
  const { exit } = useApp()
  const {
    executableCommand,
    setError,
    setExecuting,
    setExecutableCommand,
    setOutput,
    setRoute,
    setQuery,
    conventionalCommitMessage
  } = useAppStore(
    (state) => ({
      executableCommand: state.executableCommand,
      setError: state.setError,
      setExecuting: state.setExecuting,
      setExecutableCommand: state.setExecutableCommand,
      setOutput: state.setOutput,
      setRoute: state.setRoute,
      setQuery: state.setQuery,
      conventionalCommitMessage: state.conventionalCommitMessage
    }),
    shallow
  )
  const executeAction = async (action: AppAction) => {
    switch (action) {
      case AppAction.EXIT:
        return exit()
      case AppAction.GO_TO_OVERVIEW:
        return setRoute(Route.OVERVIEW)
      case AppAction.GO_TO_COMMIT:
        return setRoute(Route.COMMIT)
      case AppAction.CONVENTIONAL_COMMIT:
        try {
          const { stdout } = await execa('git', [
            'commit',
            '-m',
            conventionalCommitMessage || ''
          ])
          setOutput(stdout)
        } catch (error: any) {
          setError(error.message)
        }
        return setRoute(Route.OVERVIEW)
    }
  }
  useEffect(() => {
    const execute = async () => {
      if (!executableCommand) return
      setError(null)
      setExecuting(true)
      if (executableCommand?.action) executeAction(executableCommand.action)
      if (executableCommand?.command) {
        const [cmd, ...options] = executableCommand.command?.split(' ')
        if (!cmd) return
        try {
          const { stdout } = await execa(cmd, options, {
            detached: true,
            buffer: false,
            stdio: 'inherit'
          })
          setOutput(stdout)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setQuery('')
          setRoute(Route.OVERVIEW)
        }
      }
      setExecuting(false)
      setExecutableCommand(null)
    }
    execute()
  }, [executableCommand])
}
