import React from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import { motion } from "framer-motion";
import Header from "./Header";
import {
  CarOutlined,
  ClockCircleOutlined,
  CloudOutlined,
  CoffeeOutlined,
  ExperimentOutlined,
  SkinOutlined,
  WifiOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const services = [
  {
    icon: <WifiOutlined />,
    title: "WiFi",
    description: "Stay connected with high-speed internet access.",
  },
  {
    icon: <CoffeeOutlined />,
    title: "Breakfast",
    description: "Start your day with a delicious breakfast buffet.",
  },
  {
    icon: <SkinOutlined />,
    title: "Laundry",
    description: "Keep your clothes clean and fresh with our laundry service.",
  },
  {
    icon: <ExperimentOutlined />,
    title: "Mini-bar",
    description: "Enjoy a refreshing drink or snack from our in-room mini-bar.",
  },
  {
    icon: <CarOutlined />,
    title: "Parking",
    description: "Park your car conveniently in our on-site parking lot.",
  },
  {
    icon: <CloudOutlined />,
    title: "Air Conditioning",
    description: "Stay cool and comfortable with our air conditioning system.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const HotelService = () => {
  return (
    <div>
      <Header title="Our Services" />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Row justify="center" style={{ marginTop: 24 }}>
          <Title level={4} style={{ textAlign: "center", margin: "0 16px"}}>
            Services at <span className="hotel-color">lakeSide -</span> Hotel{" "}
            <span style={{ marginLeft: 16 }}>
              <ClockCircleOutlined style={{ marginRight: 8 }} /> 24-Hour Front
              Desk
            </span>
          </Title>
        </Row>
      </motion.div>

      <Divider />

      <Row gutter={[16, 16]} className={"container service__container"}>
        {services.map((service, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <motion.div
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              style={{ height: "100%"}}
            >
              <Card hoverable style={{height: "100%"}}>
                <Card.Meta
                  title={
                    <span className="hotel-color">
                      {service.icon} {service.title}
                    </span>
                  }
                  description={<Paragraph>{service.description}</Paragraph>}
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      <Divider />
    </div>
  );
};

export default HotelService;
