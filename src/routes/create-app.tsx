import React from 'react'
import { Box, Text } from 'ink'
import { Select } from '@inkjs/ui'
import { createAppCommands } from '../commands/create-app'
import { useCommands } from '../hooks/useCommands'

export const CreateAppRoute = () => {
  const { setCommandForExecution } = useCommands()
  return (
    <Box height={11} flexDirection="column" borderStyle="single">
      <Text>Create App ({createAppCommands.length})</Text>
      <Select
        options={createAppCommands}
        onChange={setCommandForExecution}
        visibleOptionCount={8}
      />
    </Box>
  )
}
