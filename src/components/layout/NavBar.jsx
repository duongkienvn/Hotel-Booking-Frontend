import React, {useEffect, useState} from "react";
import {Link, NavLink, useLocation, useSearchParams} from "react-router-dom";
import {Button, Drawer, Dropdown, Layout, Menu, Space, Typography} from "antd";
import {DownOutlined, MenuOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import Logout from "../auth/Logout";
import logo from "/public/images/LOGO_KS.png";
import {useAuth} from "../auth/AuthProvider.jsx";

const {Header} = Layout;
const {Text} = Typography;

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();
  const auth = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchParams] = useSearchParams();
  const encodedToken = searchParams.get("token");

  useEffect(() => {
    if (encodedToken) {
      const token = decodeURIComponent(encodedToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      auth.handleLogin(token);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const accountMenuItems = [
    {
      key: "register",
      label: <Link to="/register">
        <Space>
          <UserAddOutlined/> Register
        </Space>
      </Link>,
      hidden: isLoggedIn,
    },
    {
      key: "logout",
      label: <Logout/>,
      hidden: !isLoggedIn,
      style: {
        padding: 0
      }
    },
  ];

  const menuItems = [
    {key: "/", label: <NavLink to="/">Home</NavLink>},
    {key: "/about", label: <NavLink to="/about">About</NavLink>},
    {key: "/services", label: <NavLink to="/services">Services</NavLink>},
    {key: "/contact", label: <NavLink to="/contact">Contact</NavLink>},
    ...(isLoggedIn && userRole === "ROLE_ADMIN"
      ? [{key: "admin", label: <NavLink to="/admin">Admin</NavLink>}]
      : []),
  ];

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  const visibleItems = accountMenuItems.filter(item => !item.hidden)

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 8px #f0f1f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "85px"
      }}
    >
      <Link to="/" style={{display: "flex", alignItems: "center", gap: "10px"}}>
        <img src={logo} alt="LakeSide Hotel Logo" style={{height: "40px"}}/>
        <span style={{fontSize: "18px", fontWeight: 600, color: "#1890ff"}}>
          LakeSide Hotel
        </span>
      </Link>

      {!isMobile && (
        <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{borderBottom: "none", fontSize: 16}}
            items={menuItems}
          />
        </div>
      )}

      <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
        {isLoggedIn && !isMobile && <Link to="/find-booking">Find Booking</Link>}
        <Dropdown
          menu={{items: visibleItems}}
          trigger={["click"]}
          open={showAccount}
          onOpenChange={setShowAccount}
        >
          <Button type="text" icon={<UserOutlined/>}>
            <Space>Account <DownOutlined/></Space>
          </Button>
        </Dropdown>

        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined/>}
            onClick={() => setDrawerOpen(true)}
            style={{fontSize: "24px"}}
          />
        )}
      </div>

      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{body: {padding: "0"}}}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{borderRight: "none"}}
          items={menuItems.map(item => ({
            ...item,
            label: (
              <NavLink to={item.key} onClick={handleLinkClick}>
                {item.label}
              </NavLink>
            ),
          }))}
        />
        <div style={{padding: "16px"}}>
          {isLoggedIn && (
            <Link to="/find-booking" onClick={handleLinkClick}>
              <Button type="primary" block>
                Find Booking
              </Button>
            </Link>
          )}
        </div>
      </Drawer>
    </Header>
  );
};

export default NavBar;