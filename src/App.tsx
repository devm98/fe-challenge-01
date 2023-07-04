import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import React, { useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import RequireAuth from "./auth/require-auth";
import useAuth from "./auth/use-auth";
import FruitPage from "./pages/fruit-page";
import Login from "./pages/login";
import OtherPage from "./pages/other-page";

const { Header, Sider } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const auth = useAuth();

  return (
    <Layout>
      {location.pathname !== "/login" && (
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
      )}

      <Layout>
        {location.pathname !== "/login" && (
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
                    label: "Logout",
                    key: "0",
                    onClick: () => {
                      auth.signout(() => navigate("/login"));
                    },
                  },
                ],
              }}
              trigger={["hover"]}
            >
              <Space>
                {auth?.user?.name}{" "}
                <Avatar
                  shape="circle"
                  icon={<UserOutlined />}
                  src={auth?.user?.picture}
                />
              </Space>
            </Dropdown>
          </Header>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <FruitPage />
              </RequireAuth>
            }
          />
          <Route
            path="/other-page"
            element={
              <RequireAuth>
                <OtherPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;
