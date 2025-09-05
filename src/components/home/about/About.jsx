import React from 'react';
import { Card, Col, Divider, Image, Layout, Row, Typography } from 'antd';
import { HeartOutlined, SmileOutlined, StarOutlined, GlobalOutlined} from '@ant-design/icons';
import { motion } from 'framer-motion';
import './AboutUs.css';
import hotel from "../../../assets/images/home-slide01.jpg";
import hotel_bg from "../../../assets/images/9fa34fd55c8a210755fc10c049904340.jpg";
import hotel_room from "../../../assets/images/photo-1631049307264-da0ec9d70304.jpeg";
import hotel_lobby from "../../../assets/images/premium_photo-1661881436846-5a0f53025711.jpeg";
import hotel_pool from "../../../assets/images/3bb1b8cf846fae3eefd8175c3630cf83.jpg";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const AboutUs = () => {
  return (
    <Layout>
      <div className="about-hero-section" style={{
        backgroundImage: `url(${hotel_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Title level={1} className="hero-title">
            About LakeSide Hotel
          </Title>
          <Paragraph className="hero-subtitle">
            Your perfect retreat where nature meets luxury.
          </Paragraph>
        </motion.div>
      </div>

      <Content style={{ padding: '40px 80px' }}>
        <motion.div
          className="section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <motion.div variants={itemVariants}>
                <Title level={2}>Our Story</Title>
                <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  Founded with a passion for creating an ideal resting place, LakeSide Hotel is not just a hotel—it's an
                  experience. Located on the romantic shores of a lake, we are proud to offer the perfect blend of natural
                  beauty and sophisticated architecture.
                </Paragraph>
                <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  Every detail at LakeSide Hotel is meticulously cared for, from the luxurious and cozy interior design to
                  our professional and dedicated service. Our mission is to create unforgettable moments and provide
                  absolute relaxation for every guest.
                </Paragraph>
              </motion.div>
            </Col>
            <Col xs={24} md={12}>
              <motion.div variants={imageVariants}>
                <Image
                  src={hotel}
                  alt="Exterior of LakeSide Hotel"
                  className="about-image"
                  preview={false}
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <Divider />

        <motion.div
          className="section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            Our Core Values
          </Title>
          <Row gutter={[32, 32]} className={"value-container"}>
            <Col xs={24} md={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Card className="value-card">
                  <SmileOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Title level={4}>Guest Experience</Title>
                  <Paragraph>
                    We put your satisfaction first. Every request is handled thoughtfully and promptly to ensure your stay
                    is perfect.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Card className="value-card">
                  <HeartOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
                  <Title level={4}>Dedicated Service</Title>
                  <Paragraph>
                    Our professional and friendly staff is always ready to serve you with all their heart, making you feel
                    right at home.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={12} lg={6} >
              <motion.div variants={itemVariants}>
                <Card className="value-card">
                  <StarOutlined style={{ fontSize: '48px', color: '#faad14' }} />
                  <Title level={4}>Commitment to Excellence</Title>
                  <Paragraph>
                    We continuously improve the quality of our service and facilities to bring you the most perfect
                    experiences.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Card className="value-card">
                  <GlobalOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                  <Title level={4}>Sustainability</Title>
                  <Paragraph>
                    We care about the environment and are committed to eco-friendly practices for a greener future.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          </Row>

        </motion.div>

        <Divider />

        <motion.div
          className="section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            Gallery
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <motion.div variants={itemVariants}>
                <Image
                  src={hotel_room}
                  alt="Hotel room"
                  className="gallery-image"
                  preview={false}
                />
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div variants={itemVariants}>
                <Image
                  src={hotel_lobby}
                  alt="Hotel lobby"
                  className="gallery-image"
                  preview={false}
                />
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div variants={itemVariants}>
                <Image
                  src={hotel_pool}
                  alt="Hotel pool"
                  className="gallery-image"
                  preview={false}
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Content>
    </Layout>
  );
};

export default AboutUs;