export enum AppAction {
  EXIT = 'EXIT',
  GO_TO_OVERVIEW = 'GO_TO_OVERVIEW',
  GO_TO_COMMIT = 'GO_TO_COMMIT',
  CONVENTIONAL_COMMIT = 'CONVENTIONAL_COMMIT'
}

export enum Route {
  OVERVIEW = 'OVERVIEW',
  COMMIT = 'COMMIT'
}

export type Command = {
  label: string
  value: string
  command?: string
  action?: AppAction
}
