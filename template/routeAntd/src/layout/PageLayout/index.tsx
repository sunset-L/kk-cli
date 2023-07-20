import { Layout } from 'antd'
import PageHeader from '@/layout/PageHeader'
import PageSide from '@/layout/PageSide'
import PageContent from '@/layout/PageContent'

const Index = () => {
  return (
    <Layout>
      <PageHeader />
      <Layout>
        <PageSide />
        <PageContent />
      </Layout>
    </Layout>
  )
}

export default Index
