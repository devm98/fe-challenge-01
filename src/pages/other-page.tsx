import { theme } from "antd";
import { Content } from "antd/es/layout/layout";

const OtherPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        backgroundColor: colorBgContainer,
      }}
    >
      OtherPage
    </Content>
  );
};

export default OtherPage;
