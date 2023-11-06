import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Button, Flex, Layout, Menu, theme } from "antd";
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
  const [userOpen, setUserOpen] = useState(false);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleButtonClick = () => {
    setUserOpen(!userOpen);
  };

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
          <Flex justify="space-between" align="center">
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
            {location.pathname === "/users" && (
              <div
                onClick={handleButtonClick}
                className=" -mt-1 z-50 relative mr-10"
              >
                <div className="bg-[#DB4444] rounded-full cursor-pointer">
                  <img
                    src={"/images/user.jpg"}
                    width={30}
                    height={30}
                    alt="user"
                  />
                </div>
                {userOpen && (
                  <div
                    onClick={() => setUserOpen(false)}
                    className="user_modal z-50 absolute p-1  w-[300px] right-0"
                  >
                    <Flex>asdf</Flex>
                  </div>
                )}
              </div>
            )}
          </Flex>
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
