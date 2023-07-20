import { useEffect } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { routesConf } from '@/router'
import { mergeUserRoutes, renderRoutes } from '@/router/tool'

function App() {
  useEffect(() => {
    console.warn('init', import.meta.env)
  }, [])

  const routes = mergeUserRoutes(renderRoutes(routesConf))
  const router = createHashRouter(routes)
  return <RouterProvider router={router}></RouterProvider>
}

export default App
