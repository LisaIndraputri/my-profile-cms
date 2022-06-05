import React, {useState, useEffect, useCallback} from 'react'
import {useNavigate} from 'react-router-dom';
import { HomeOutlined, ProjectOutlined, UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Image, Divider } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '/', <HomeOutlined />),
  getItem('Project Category', '/project-category', <ProjectOutlined />),
  getItem('Project List', '/project-list', <UnorderedListOutlined />),
];


function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const handleMenuClicked = useCallback((e) => navigate(e.key, {replace: false}), [navigate]);
  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  if (user && user.name) {
    return (
      <Sider
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        breakpoint='lg'
        onBreakpoint={() => setCollapsed(false)}
      >
        <Image
          style={{
            padding: '24px 0',
          }}
          src={require("../../assets/icon/logo.png")}
        />
        <Menu 
          defaultSelectedKeys={['/']} 
          mode="inline" 
          items={items} 
          onClick={handleMenuClicked}
        />
        <Menu 
          mode="inline" 
          items={[
            { label: 'Logout', key: 'logout', icon: <LogoutOutlined /> },
          ]}
          onClick={handleLogout}
        />
        <Divider />
      </Sider>
    )
  }
}

export default Sidebar