import React from 'react'
import { Box } from 'ink'
import { Output } from '../ui/Output'
import { QueryInput } from '../ui/QueryInput'
import { CommandChoice } from '../ui/CommandChoice'

export const OverviewRoute = () => {
  return (
    <Box flexDirection="column">
      <Output />
      <Box flexDirection="column">
        <CommandChoice />
        <QueryInput />
      </Box>
    </Box>
  )
}
