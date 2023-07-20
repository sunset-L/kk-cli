import { Link, Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <>
      嵌套路由
      <Link to="example2">example2</Link>
      <Outlet />
    </>
  )
}

export default Index
