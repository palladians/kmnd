import React from 'react'
import { Box, useApp, useInput } from 'ink'
import { Output } from '../ui/Output'
import { QueryInput } from '../ui/QueryInput'
import { CommandChoice } from '../ui/CommandChoice'

export const OverviewRoute = () => {
  const { exit } = useApp()
  useInput((_, key) => {
    if (key.escape) {
      exit()
    }
  })
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
