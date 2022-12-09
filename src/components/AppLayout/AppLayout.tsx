import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';

const { Header, Content } = Layout;

export const AppLayout = () => {
  const { pathname } = useLocation();

  const menuItems: MenuProps['items'] = [
    {
      key: `menu-item-1`,
      label: <Link to='/'>Disciplines</Link>,
    },
    {
      key: `menu-item-0`,
      label: <Link to="/add">Create new discipline</Link>,
    },
  ]

  const selectedKeys =
    pathname === '/' ? [menuItems[0]?.key?.toString() ?? ''] : [menuItems[1]?.key?.toString() ?? '']

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={menuItems}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}
