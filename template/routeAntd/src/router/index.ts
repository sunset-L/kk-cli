import { IRoute } from './tool'

export const routesConf: IRoute[] = [
  {
    title: '首页',
    icon: 'menu-react',
    path: '/',
    component: 'Empty',
  },
  {
    title: 'example1',
    path: 'example1',
    component: 'Example',
    children: [
      {
        title: 'example2',
        path: 'example2',
        component: 'Example',
        hideInMenu: true,
      },
    ],
  },
]
