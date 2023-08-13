import { AppAction } from '../types'

export const createAppCommands = [
  {
    label: '← Go back',
    value: 'kmnd_go_back',
    action: AppAction.GO_TO_OVERVIEW
  },
  {
    label: '· Next.js',
    value: 'create_app_next',
    command: 'npm next-app@latest'
  },
  {
    label: '· Remix',
    value: 'create_app_remix',
    command: 'npm create remix@latest'
  },
  { label: '· Vite', value: 'git_commit', command: 'npm create vite@latest' },
  {
    label: '· Create React App',
    value: 'git_push',
    command: 'npm create react-app@latest'
  }
]
