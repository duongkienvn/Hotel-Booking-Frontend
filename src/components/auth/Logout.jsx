import React, {useContext} from "react"
import {AuthContext} from "./AuthProvider"
import {Link, useNavigate} from "react-router-dom"
import {Menu, Space} from "antd";
import {LogoutOutlined, ProfileOutlined} from '@ant-design/icons';

const Logout = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.handleLogout()
    navigate("/", {state: {message: "You have been logged out!"}})
  }

  const items = [
    {
      key: "profile",
      label: <Link to="/profile">
        <Space>
          <ProfileOutlined/> Profile
        </Space>
      </Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      danger: true,
      label: <Space>
        <LogoutOutlined/> Logout
      </Space>,
      onClick: () => handleLogout(),
    },
  ];

  return (
    <Menu selectable={false} items={items}/>
  )
}

export default Logout
