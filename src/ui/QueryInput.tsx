import React from 'react'
import { Box, Text } from 'ink'
import { TextInput } from '@inkjs/ui'
import { useAppStore } from '../store/app'

export const QueryInput = () => {
  const setQuery = useAppStore((state) => state.setQuery)
  return (
    <Box borderStyle="single">
      <Box>
        <Text>❯ </Text>
        <TextInput
          placeholder="Search for commands"
          onChange={(query: string) => setQuery(query)}
        />
      </Box>
    </Box>
  )
}
