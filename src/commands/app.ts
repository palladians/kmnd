import { AppAction } from '../types'

export const appCommands = [
  {
    label: '· Git',
    value: 'kmnd_git',
    action: AppAction.GO_TO_GIT
  },
  {
    label: '· Create App',
    value: 'kmnd_create_app',
    action: AppAction.GO_TO_CREATE_APP
  },
  {
    label: '✕ Exit',
    value: 'kmnd_exit',
    action: AppAction.EXIT
  }
]
