import { AppAction } from '../types'

export const gitCommands = [
  {
    label: '← Go Back',
    value: 'kmnd_go_back',
    action: AppAction.GO_TO_OVERVIEW
  },
  { label: '· Add All', value: 'git_add_all', command: 'git add .' },
  { label: '· Status', value: 'git_status', command: 'git status' },
  { label: '· Commit', value: 'git_commit', command: 'git commit' },
  { label: '· Push', value: 'git_push', command: 'git push' }
]
