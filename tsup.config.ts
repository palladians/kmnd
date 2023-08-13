import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/cli.tsx'],
  outDir: './dist',
  format: 'esm' as any,
  sourcemap: true,
  clean: true,
  bundle: true,
  dts: true
})
