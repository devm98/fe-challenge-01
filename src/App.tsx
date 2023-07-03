import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import FruitPage from "./pages/fruit-page";
import OtherPage from "./pages/other-page";

const { Header, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={"/"}>Fruits management</Link>,
            },
            {
              key: "2",
              icon: <UploadOutlined />,
              label: <Link to={"/other-page"}>Other page</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            paddingRight: 20,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
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
          <Dropdown
            menu={{
              items: [
                {
                  label: <a href="#">Logout</a>,
                  key: "0",
                },
              ],
            }}
            trigger={["hover"]}
          >
            <Space>
              KMinh <Avatar shape="circle" icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        </Header>

        <Routes>
          <Route path="/" element={<FruitPage />} />
          <Route path="/other-page" element={<OtherPage />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;
