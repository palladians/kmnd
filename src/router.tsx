import React from 'react'
import { OverviewRoute } from './routes/overview'
import { useAppStore } from './store/app'
import { Route } from './types'
import { GitRoute } from './routes/git'
import { CreateAppRoute } from './routes/create-app'

export const Router = () => {
  const route = useAppStore((state) => state.route)
  switch (route) {
    case Route.OVERVIEW:
      return <OverviewRoute />
    case Route.GIT:
      return <GitRoute />
    case Route.CREATE_APP:
      return <CreateAppRoute />
  }
}
