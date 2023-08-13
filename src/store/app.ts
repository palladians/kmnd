import { createWithEqualityFn } from 'zustand/traditional'
import { Command, Route } from '../types'

type AppState = {
  route: Route
  query: string
  output: string | null
  error: string | null
  executableCommand: Command | null
  executing: boolean
  conventionalCommitMessage: string | null
}

type AppMutators = {
  setRoute: (route: Route) => void
  setQuery: (query: string) => void
  setOutput: (output: string) => void
  setError: (error: string | null) => void
  setExecutableCommand: (executableCommand: Command | null) => void
  setExecuting: (executing: boolean) => void
  setConventionalCommitMessage: (conventionalCommitMessage: string) => void
}

type AppStore = AppState & AppMutators

export const initialState = {
  route: Route[Route.OVERVIEW],
  query: '',
  output: null,
  error: null,
  executableCommand: null,
  executing: false,
  conventionalCommitMessage: null
}

export const useAppStore = createWithEqualityFn<AppStore>()(
  (set) => ({
    ...initialState,
    setRoute: (route) => set({ route }),
    setQuery: (query) => set({ query }),
    setOutput: (output) => set({ output }),
    setError: (error) => set({ error }),
    setExecutableCommand: (executableCommand) => set({ executableCommand }),
    setExecuting: (executing) => set({ executing }),
    setConventionalCommitMessage: (conventionalCommitMessage) =>
      set({ conventionalCommitMessage })
  }),
  Object.is
)
