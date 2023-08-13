import React from 'react'
import { OverviewRoute } from './routes/overview'
import { CommitRoute } from './routes/commit'
import { useAppStore } from './store/app'
import { Route } from './types'

export const Router = () => {
  const route = useAppStore((state) => state.route)
  switch (route) {
    case Route.OVERVIEW:
      return <OverviewRoute />
    case Route.COMMIT:
      return <CommitRoute />
  }
}
