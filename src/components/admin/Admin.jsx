import React from "react";
import { Link } from "react-router-dom";
import { Typography, Divider, Space, Button } from "antd";

const { Title } = Typography;

const Admin = () => {
  return (
    <section className="container mt-5">
      <Title level={2}>Welcome to Admin Panel</Title>
      <Divider />
      <Space direction="vertical" size="middle">
        <Button type="primary">
          <Link to="/existing-rooms">Manage Rooms</Link>
        </Button>
        <Button type="primary">
          <Link to="/existing-bookings">Manage Bookings</Link>
        </Button>
        <Button type={"primary"}>
          <Link to={"/existing-reviews"}>Manage Testimonials</Link>
        </Button>
      </Space>
    </section>
  );
};

export default Admin;
