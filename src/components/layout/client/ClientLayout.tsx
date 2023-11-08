import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Button, Flex, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import useAuth from "../../../state/auth";

import "../admin/style.css";

const ClientLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const [userOpen, setUserOpen] = useState(false);

  const { logOut, user } = useAuth();
  console.log(user);

  const handleButtonClick = () => {
    setUserOpen(!userOpen);
  };

  const handleLogOut = () => {
    logOut(navigate);
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
        <div className="admin-logo">
          {collapsed ? `${user?.firstName}` : `${user?.firstName}`}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard/client",
              icon: <PieChartOutlined />,
              label: <Link to="/dashboard/client">Dashboard</Link>,
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
                <div className="user_modal z-50 absolute p-1 w-[150px] right-0  ">
                  <div
                    onClick={handleLogOut}
                    className="flex justify-start items-center text-white cursor-pointer"
                  >
                    <img
                      src={"/images/logouticon.png"}
                      width={24}
                      height={24}
                      alt="log-out"
                    />
                    <span className="ml-2 text-black">Log out</span>
                  </div>

                  <Link
                    to="/account"
                    className="flex justify-start items-center text-white cursor-pointer"
                  >
                    <img
                      src={"/images/accounticon.png"}
                      width={24}
                      height={24}
                      alt="log-out"
                    />
                    <span className="ml-2 text-black">Account</span>
                  </Link>
                </div>
              )}
            </div>
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

export default ClientLayout;
