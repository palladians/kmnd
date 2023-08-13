import React from 'react'
import { Box, Text } from 'ink'
import { Select } from '@inkjs/ui'
import { gitCommands } from '../commands/git'
import { useCommands } from '../hooks/useCommands'

export const GitRoute = () => {
  const { setCommandForExecution } = useCommands()
  return (
    <Box height={11} flexDirection="column" borderStyle="single">
      <Text>Git ({gitCommands.length})</Text>
      <Select
        options={gitCommands}
        onChange={setCommandForExecution}
        visibleOptionCount={8}
      />
    </Box>
  )
}
