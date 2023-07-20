import { Layout } from 'antd'
import style from './index.module.less'
import { ReactComponent as Logo } from '@/assets/react.svg'

const Index = () => {
  return (
    <Layout.Header className={style.header}>
      <Logo style={{ fontSize: 30 }} />
      标题
    </Layout.Header>
  )
}

export default Index
