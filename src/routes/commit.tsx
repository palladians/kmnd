import React, { useMemo } from 'react'
import { Box, Text, useInput } from 'ink'
import { Select, TextInput, ConfirmInput } from '@inkjs/ui'
import { useState } from 'react'
import { useAppStore } from '../store/app'
import { AppAction } from '../types'

enum FormStage {
  COMMIT_TYPE = 'COMMIT_TYPE',
  SCOPE = 'SCOPE',
  MESSAGE = 'MESSAGE',
  BREAKING_CHANGE = 'BREAKING_CHANGE'
}

const COMMIT_TYPES = [
  { label: 'Fix', value: 'fix' },
  { label: 'Feat', value: 'feat' },
  { label: 'Build', value: 'build' },
  { label: 'Chore', value: 'chore' },
  { label: 'CI', value: 'ci' },
  { label: 'Docs', value: 'docs' },
  { label: 'Style', value: 'style' },
  { label: 'Refactor', value: 'refactor' },
  { label: 'Perf', value: 'perf' },
  { label: 'Test', value: 'test' }
]

export const CommitRoute = () => {
  const { setExecutableCommand, setConventionalCommitMessage } = useAppStore(
    (state) => ({
      setExecutableCommand: state.setExecutableCommand,
      setConventionalCommitMessage: state.setConventionalCommitMessage
    })
  )
  const [formStage, setFormStage] = useState<FormStage>(FormStage.COMMIT_TYPE)
  const [commitType, setCommitType] = useState<string | null>(null)
  const [commitScope, setCommitScope] = useState<string | null>(null)
  const [commitMessage, setCommitMessage] = useState<string | null>(null)
  const [breakingChange, setBreakingChange] = useState<boolean>(false)
  const formattedCommitMessage = useMemo(
    () =>
      `${commitType || ''}(${commitScope || ''})${breakingChange ? '!' : ''}: ${
        commitMessage || ''
      }`,
    []
  )
  const handleSetCommitType = (value: string) => {
    setCommitType(value)
    setFormStage(FormStage.SCOPE)
  }
  const handleSetScope = (scope: string) => {
    setCommitScope(scope)
    setFormStage(FormStage.MESSAGE)
  }
  const handleSetMessage = (message: string) => {
    setCommitMessage(message)
    setFormStage(FormStage.BREAKING_CHANGE)
  }
  const handleSetBreakingChange = (breakingChange: boolean) => {
    setBreakingChange(breakingChange)
    setConventionalCommitMessage(formattedCommitMessage)
    setExecutableCommand({
      label: 'Conventional Commit',
      value: 'kmnd_commit',
      action: AppAction.CONVENTIONAL_COMMIT
    })
  }
  useInput((_, key) => {
    if (key.escape) {
      setExecutableCommand({
        label: 'Go to overview',
        value: 'kmnd_overview',
        action: AppAction.GO_TO_OVERVIEW
      })
    }
  })
  return (
    <Box flexDirection="column" borderStyle="single">
      {formStage === FormStage.COMMIT_TYPE && (
        <Box flexDirection="column">
          <Text>Commit Type</Text>
          <Select
            options={COMMIT_TYPES}
            onChange={handleSetCommitType}
            visibleOptionCount={10}
          />
        </Box>
      )}
      {formStage === FormStage.SCOPE && (
        <Box flexDirection="column">
          <Text>Commit Scope</Text>
          <TextInput placeholder="Scope" onSubmit={handleSetScope} />
        </Box>
      )}
      {formStage === FormStage.MESSAGE && (
        <Box flexDirection="column">
          <Text>Commit Message</Text>
          <TextInput placeholder="Message" onSubmit={handleSetMessage} />
        </Box>
      )}
      {formStage === FormStage.BREAKING_CHANGE && (
        <Box flexDirection="column">
          <Text>Breaking Change</Text>
          <ConfirmInput
            defaultChoice="cancel"
            onConfirm={() => handleSetBreakingChange(true)}
            onCancel={() => handleSetBreakingChange(false)}
          />
        </Box>
      )}
    </Box>
  )
}
