import React, { useRef, useState } from 'react'
import { Spin } from 'antd'
import './index.less'
import { useAsyncEffect } from 'ahooks'

export interface IconProps {
  name: string
  className?: string
  style?: React.CSSProperties
  fill?: string
  width?: string
  height?: string
}

const DynamicIcon = (props: IconProps) => {
  const icon = useRef(null)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async () => {
    setLoading(true)
    // https://cn.vitejs.dev/guide/features.html#dynamic-import
    const Icon = await import(`../../assets/svg/${props.name}.svg`)
    const { ReactComponent } = Icon

    icon.current = ReactComponent
    setLoading(false)
  }, [props.name, setLoading])

  if (!loading) {
    const Component = icon.current as any
    return <Component {...props} />
  }

  return <Spin className="dynamic-icon-spin" size="small" />
}

DynamicIcon.defaultProps = {
  width: '1em',
  height: '1em',
}

export default DynamicIcon
