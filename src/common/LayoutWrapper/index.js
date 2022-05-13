import {
  AppstoreOutlined,
  CalendarOutlined,
  ContactsOutlined,
  // DashboardOutlined,
  FileTextOutlined,
  MailOutlined,
  SettingOutlined,
  WechatOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Logo from "assets/logo.png";
import { useHistory } from "react-router-dom";
// import { useState } from "react";

const { Content, Sider } = Layout;

import styles from "./LayoutWrapper.module.scss";

function LayoutWrapper({ children }) {
  // const [route, setRoute] = useState("/");
  const routes = [
    // {
    //   label: "Dashboard",
    //   route: "/",
    //   key: "1",
    //   logo: <DashboardOutlined className={styles.menuicon} />,
    // },
    {
      label: "Users",
      route: "/users",
      key: "2",
      logo: <MailOutlined className={styles.menuicon} />,
    },
    {
      label: "Tip of the day",
      route: "/tip-of-the-day",
      key: "3",
      logo: <WechatOutlined className={styles.menuicon} />,
    },
    {
      label: "Trending Events",
      route: "/trending-news",
      key: "4",
      logo: <AppstoreOutlined className={styles.menuicon} />,
    },
    {
      label: "News",
      route: "/news",
      key: "5",
      logo: <ContactsOutlined className={styles.menuicon} />,
    },
    {
      label: "Identity Verification",
      route: "/identity-verification",
      key: "6",
      logo: <CalendarOutlined className={styles.menuicon} />,
    },
    {
      label: "Reports",
      route: "/reports",
      key: "7",
      logo: <FileTextOutlined className={styles.menuicon} />,
    },
    {
      label: "Advertising",
      route: "/advertisement",
      key: "9",
      logo: <DashboardOutlined className={styles.menuicon} />,
    },
    {
      label: "Sign Out",
      route: "/logout",
      key: "8",
      logo: <SettingOutlined className={styles.menuicon} />,
    },
  ];

  const history = useHistory();
  const { pathname } = history?.location || {};

  console.log("pathname", pathname);

  const key = routes?.find((item) => item?.route == pathname)?.key;
  console.log("defaultValue", key);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className={styles.LayoutWrapperWrapper}>
      <Layout hasSider>
        <Sider className={styles.sider}>
          <div className={styles.logo}>
            <img src={Logo} alt="logo" />
          </div>
          <p className={styles.mainMenu}>MAIN MENU</p>
          <Menu className={styles.menuWrap} mode="inline" defaultValue={["2"]}>
            {routes?.map((item) => (
              <Menu.Item
                key={item?.key}
                icon={item?.logo}
                onClick={() => {
                  console.log("routes", item);
                  item?.route === "/logout"
                    ? handleLogout()
                    : history.push(`${item?.route}`);
                }}
                className={styles.menuItem}
              >
                {item?.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default LayoutWrapper;
