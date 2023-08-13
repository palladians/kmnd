import React from 'react'
import { Box, Text } from 'ink'
import { Select } from '@inkjs/ui'
import { useCommands } from '../hooks/useCommands'
import { useAppStore } from '../store/app'
import { shallow } from 'zustand/shallow'

export const CommandChoice = () => {
  const { executableCommand, query } = useAppStore(
    (state) => ({
      executableCommand: state.executableCommand,
      query: state.query,
      setExecutableCommand: state.setExecutableCommand
    }),
    shallow
  )
  const { filteredCommands, resultsCount, setCommandForExecution } =
    useCommands()
  return (
    <Box flexDirection="column" borderStyle="single">
      <Text>Results ({resultsCount})</Text>
      <Select
        key={executableCommand?.['label']}
        options={filteredCommands}
        highlightText={query}
        onChange={setCommandForExecution}
        visibleOptionCount={8}
      />
    </Box>
  )
}
