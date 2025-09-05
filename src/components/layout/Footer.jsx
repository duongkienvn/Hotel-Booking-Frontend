import React from "react";
import {Col, Divider, Layout, Row, Space, Typography} from "antd";
import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

const {Footer} = Layout;
const {Title, Text, Link} = Typography;

const AppFooter = () => {
  const today = new Date();

  return (
    <Footer style={{backgroundColor: "#001529", color: "#fff", padding: "40px 0"}}>
      <div style={{maxWidth: "1200px", margin: "0 auto", padding: "0 20px"}}>
        <Row gutter={[16, 32]}>
          <Col xs={24} md={8}>
            <Title level={4} style={{color: "#fff", marginBottom: "16px"}}>LakeSide Hotel</Title>
            <Text style={{color: "#aaa"}}>
              Experience a luxurious retreat with breathtaking lake views. We are dedicated to providing a professional
              and comfortable environment for your perfect getaway.
            </Text>
          </Col>

          <Col xs={24} md={6}>
            <Title level={5} style={{color: "#fff"}}>Quick Links</Title>
            <Space direction="vertical" style={{width: "100%", marginTop: "8px"}}>
              <NavLink to={"/about"} style={{color: "#aaa"}}>About Us</NavLink>
              <NavLink to={"/browse-all-rooms"} style={{color: "#aaa"}}>Rooms & Suites</NavLink>
              <NavLink to={"/services"} style={{color: "#aaa"}}>Services & Amenities</NavLink>
              <NavLink to={"/contact"} style={{color: "#aaa"}}>Contact</NavLink>
            </Space>
          </Col>

          <Col xs={24} md={6}>
            <Title level={5} style={{color: "#fff"}}>Contact Us</Title>
            <Space direction="vertical" style={{width: "100%", marginTop: "8px"}}>
              <Text style={{color: "#aaa"}}>
                <EnvironmentOutlined style={{marginRight: "8px"}}/>
                123 West Lake Street, Hanoi
              </Text>
              <Text style={{color: "#aaa"}}>
                <PhoneOutlined style={{marginRight: "8px"}}/>
                +84 123 456 789
              </Text>
              <Text style={{color: "#aaa"}}>
                <MailOutlined style={{marginRight: "8px"}}/>
                info@lakesidehotel.com
              </Text>
            </Space>
          </Col>

          <Col xs={24} md={4}>
            <Title level={5} style={{color: "#fff"}}>Follow Us</Title>
            <div style={{marginTop: "8px"}}>
              <Link href="https://facebook.com" target="_blank" style={{color: "#fff", marginRight: "16px"}}>
                <FacebookOutlined style={{fontSize: "24px"}}/>
              </Link>
              <Link href="https://instagram.com" target="_blank" style={{color: "#fff", marginRight: "16px"}}>
                <InstagramOutlined style={{fontSize: "24px"}}/>
              </Link>
              <Link href="https://twitter.com" target="_blank" style={{color: "#fff"}}>
                <TwitterOutlined style={{fontSize: "24px"}}/>
              </Link>
            </div>
          </Col>
        </Row>

        <Divider style={{backgroundColor: "#444", margin: "24px 0"}}/>

        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{color: "#aaa"}}>
              <Link href="#" style={{color: "#aaa", marginRight: "16px"}}>Privacy Policy</Link>
              <Link href="#" style={{color: "#aaa"}}>Terms of Use</Link>
            </Text>
          </Col>
          <Col xs={24} sm={12} style={{textAlign: "right"}}>
            <Text style={{color: "#aaa"}}>
              &copy; {today.getFullYear()} LakeSide Hotel. All Rights Reserved.
            </Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;