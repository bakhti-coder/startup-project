import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Button, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import {
  AppstoreOutlined,
  BankOutlined,
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PieChartOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./style.css";

const AdminLayout = () => {
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
        <div className="admin-logo">{collapsed ? "PTP" : "PTP admin"}</div>
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
              key: "/users",
              icon: <UserOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/skills",
              icon: <ThunderboltOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/portfolios",
              icon: <AppstoreOutlined />,
              label: <Link to="/portfolios">Portfolios</Link>,
            },
            {
              key: "/experiences",
              icon: <BankOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/educations",
              icon: <BookOutlined />,
              label: <Link to="/educations">Education</Link>,
            },
            {
              key: "/messages",
              icon: <MessageOutlined />,
              label: <Link to="/messages">Messages</Link>,
            },
            // {
            //   icon: <LogoutOutlined />,
            //   label: (
            //     <Button
            //       danger
            //       type="primary"
            //       onClick={() =>
            //         Modal.confirm({
            //           title: "Do you want to exit ?",
            //           onOk: () => {},
            //         })
            //       }
            //     >
            //       Logout
            //     </Button>
            //   ),
            // },
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

export default AdminLayout;
