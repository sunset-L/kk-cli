import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import style from './index.module.less'

const Index = () => {
  return (
    <Layout.Content className={style.content}>
      <Outlet />
    </Layout.Content>
  )
}

export default Index
