export enum AppAction {
  EXIT = 'EXIT',
  GO_TO_GIT = 'GO_TO_GIT',
  GO_TO_OVERVIEW = 'GO_TO_OVERVIEW',
  GO_TO_CREATE_APP = 'GO_TO_CREATE_APP',
  CREATE_APP = 'CREATE_APP'
}

export enum Route {
  OVERVIEW = 'OVERVIEW',
  GIT = 'GIT',
  CREATE_APP = 'CREATE_APP'
}

export type Command = {
  label: string
  value: string
  command?: string
  action?: AppAction
}
