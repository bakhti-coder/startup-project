import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Button, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import "../admin/style.css";

const ClientLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        className="h-screen"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="admin-logo">{collapsed ? "CLIENT" : "Client admin"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <PieChartOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/skills/client",
              icon: <ThunderboltOutlined />,
              label: <Link to="/skills/client">Skills</Link>,
            },
            {
              key: "/education/client",
              icon: <AppstoreOutlined />,
              label: <Link to="/education/client">Education</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
