import { AppAction } from '../types'

export const gitCommands = [
  { label: '· Git → Add All', value: 'git_add_all', command: 'git add .' },
  { label: '· Git → Status', value: 'git_status', command: 'git status' },
  {
    label: '· Git → Commit',
    value: 'git_commit',
    action: AppAction.GO_TO_COMMIT
  },
  { label: '· Git → Push', value: 'git_push', command: 'git push' }
]
