#!/usr/bin/env node
import '@total-typescript/ts-reset'
import React from 'react'
import { render } from 'ink'
import meow from 'meow'
import App from './app.js'

meow(
  `
	Usage
	  $ kmnd

	Examples
	  $ kmnd
`,
  {
    importMeta: import.meta
  }
)

render(<App />)
