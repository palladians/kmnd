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
    setRoute
  } = useAppStore(
    (state) => ({
      executableCommand: state.executableCommand,
      setError: state.setError,
      setExecuting: state.setExecuting,
      setExecutableCommand: state.setExecutableCommand,
      setOutput: state.setOutput,
      setRoute: state.setRoute
    }),
    shallow
  )
  const executeAction = (action: AppAction) => {
    switch (action) {
      case AppAction.EXIT:
        return exit()
      case AppAction.GO_TO_OVERVIEW:
        return setRoute(Route.OVERVIEW)
      case AppAction.GO_TO_GIT:
        return setRoute(Route.GIT)
      case AppAction.GO_TO_CREATE_APP:
        return setRoute(Route.CREATE_APP)
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
          const { stdout } = await execa(cmd, options)
          setOutput(stdout)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setRoute(Route.OVERVIEW)
        }
      }
      setExecuting(false)
      setExecutableCommand(null)
    }
    execute()
  }, [executableCommand])
}
