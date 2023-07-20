import { Button, Empty, Result, Space } from 'antd'
import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

const PageError: React.FC = () => {
  const navigate = useNavigate()
  const error: any = useRouteError()
  let title = error?.statusText ?? error?.message
  let reload = false
  // Loading chunk 20 failed. (error: http://10.10.48.32:40284/js/20.839ab12c.js)'
  if (/^Loading.*chunk [0-9 ]* failed.*/.test(title)) {
    title = '系统已重新部署，请刷新后重试'
    reload = true
  }

  return (
    <Result
      icon={<Empty description={null} />}
      title={title}
      extra={
        <Space>
          <Button type="primary" ghost onClick={() => navigate(-1)}>
            返回
          </Button>
          {reload ? (
            <Button type="primary" onClick={() => window.location.reload()}>
              刷新
            </Button>
          ) : null}
        </Space>
      }
    />
  )
}

export default PageError
