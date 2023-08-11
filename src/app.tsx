import React, { useMemo, useState } from 'react'
import { Select, TextInput, Spinner, Alert } from '@inkjs/ui'
import { Box, Text } from 'ink'
import { search } from 'fast-fuzzy'
import { findUp } from 'find-up'
import { usePromise } from './usePromise.js'
import { useEffect } from 'react'
import fs from 'graceful-fs'
import { promisify } from 'node:util'
import { execa } from 'execa'

const readFile = promisify(fs.readFile)

const App = () => {
  const [query, setQuery] = useState<string>('')
  const [packageJson, setPackageJson] = useState<Record<string, any> | null>(
    null
  )
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [executing, setExecuting] = useState<boolean>(false)
  const [executableCommand, setExecutableCommand] = useState<string | null>(
    null
  )
  const { data: packageJsonPath, loading: packageJsonPathLoading } = usePromise(
    () => findUp('package.json')
  )
  useEffect(() => {
    const fetchPackageJson = async () => {
      if (packageJsonPathLoading) return
      const data = JSON.parse((await readFile(packageJsonPath)).toString())
      setPackageJson(data)
    }
    fetchPackageJson()
  }, [packageJsonPath, packageJsonPathLoading])
  const packageName = useMemo(() => packageJson?.['name'], [packageJson])
  const scripts =
    useMemo(
      () =>
        packageJson &&
        Object.keys(packageJson?.['scripts']).map((key) => ({
          label: `${packageName}->${key}`,
          value: String(key)
        })),
      [packageJson]
    ) || []
  const filteredOptions = useMemo(
    () =>
      scripts &&
      search(query, scripts, {
        keySelector: (entry: any) => [entry.label, entry.value]
      }),
    [scripts, query]
  )
  useEffect(() => {
    const execute = async () => {
      if (!executableCommand) return
      setError(null)
      const options = executableCommand?.split(' ')
      setExecuting(true)
      try {
        const { stdout } = await execa('npm', ['run', ...options])
        setOutput(stdout)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setExecuting(false)
      }
      setExecutableCommand(null)
    }
    execute()
  }, [executableCommand])
  return (
    <Box flexDirection="column">
      <Box flexDirection="column">
        <Box borderStyle="single">
          <TextInput
            placeholder="Search for commands"
            onChange={(query: string) => setQuery(query)}
          />
        </Box>
        <Box flexDirection="column" borderStyle="single">
          <Text>Results</Text>
          <Select
            key={executableCommand}
            options={query.length > 0 ? filteredOptions : scripts}
            highlightText={query}
            onChange={setExecutableCommand}
          />
        </Box>
      </Box>
      {executing ? (
        <Spinner label="Executing" />
      ) : error ? (
        error && <Alert variant="error">{error}</Alert>
      ) : (
        output && <Alert variant="info">{output}</Alert>
      )}
    </Box>
  )
}

export default App
