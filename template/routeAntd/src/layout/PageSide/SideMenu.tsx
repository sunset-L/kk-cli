import { Menu } from 'antd'
import { IRoute } from '@/router/tool'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { routesConf } from '@/router'
import { useLocation, useNavigate } from 'react-router-dom'
import DynamicIcon from '@/components/DynamicIcon'
import { useEffect, useMemo, useState } from 'react'

const SideMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const menus = getMenuItems(routesConf)
  const onMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    navigate(keyPath.reverse().join('/'))
  }

  const selectedKeys = useMemo(() => {
    const pathname = location.pathname.substring(1)
    if (!pathname) return ['/']
    return pathname.split('/')
  }, [location.pathname])

  useEffect(() => {
    if (selectedKeys.length > 1) {
      const temp = selectedKeys.slice()
      temp.splice(-1, 1)
      setOpenKeys(temp)
    }
  }, [selectedKeys])

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={keys => {
        if (keys.length) {
          setOpenKeys(keys)
        }
      }}
      onClick={onMenuClick}
      items={menus}
    />
  )
}

export default SideMenu

/**
 * 根据routesConf生成menu items
 * @param routes
 */
const getMenuItems = (routes?: IRoute[]): ItemType[] => {
  return (
    routes?.map(item => {
      return {
        label: item.title,
        key: item.path,
        title: item.title,
        icon: item.icon ? <DynamicIcon name={item.icon} /> : null,
        children: item?.children?.filter(chil => !chil.hideInMenu)?.length
          ? getMenuItems(item?.children)
          : undefined,
      }
    }) ?? []
  )
}
