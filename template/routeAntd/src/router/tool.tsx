import { RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PageLayout from '@/layout/PageLayout'
import PageError from '@/pages/PageError'

export interface IRoute {
  // 名称
  title: string
  // 图标
  icon?: string
  // 路径
  path: string
  // 组件路径
  component?: string
  // 是否隐藏
  hideInMenu?: boolean
  children?: Array<IRoute>
}

export const notFoundRoute: RouteObject = {
  path: '*',
  element: <PageError />,
}
export const layoutRoute: RouteObject = {
  path: '/',
  element: <PageLayout />,
  children: [notFoundRoute],
  errorElement: <PageError />,
}

export const renderRoutes = (routesConf: IRoute[]) => {
  return routesConf.map(item => {
    const route: RouteObject = {
      path: item.path,
    }
    if (item?.children?.length) {
      route.children = renderRoutes(item.children)
    }
    if (item.component) {
      // 要以@/pages/开头，否则webpack无法找到组件
      // 要以/index结尾，否则webpack会报无法识别文件类型的警告
      const Component = lazy(
        () => import(`@/pages/${item.component}/index.tsx`)
      )

      route.element = (
        <Suspense fallback={<div>loading...</div>}>
          <Component />
        </Suspense>
      )
    }
    return route
  })
}
export const mergeUserRoutes = (routes: RouteObject[]) => {
  if (routes.length > 0) {
    layoutRoute.children = [
      ...routes,
      ...(layoutRoute.children as RouteObject[]),
    ]
  }
  return [layoutRoute]
}
