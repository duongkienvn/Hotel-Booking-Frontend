import React from 'react';
import {Button, Card, Col, Divider, Image, Layout, Row, Typography} from 'antd';
import {motion} from 'framer-motion';
import {CoffeeOutlined, HeartOutlined, WifiOutlined,} from '@ant-design/icons';
import './Service.css';
import servicesBg from "../../../assets/images/86130207.jpg";
import restaurantImage from "../../../assets/images/420940_lrg.jpg";
import spaImage from "../../../assets/images/Spa-22.jpg";
import shuttleImage from "../../../assets/images/istockphoto-1149089650-612x612.jpg";
import {Link, NavLink, useNavigate} from "react-router-dom";

const {Content} = Layout;
const {Title, Paragraph} = Typography;

const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const Services = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="services-hero-section" style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
        <motion.div
          initial={{opacity: 0, y: -50}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1}}
        >
          <Title level={1} className="hero-title">
            Our Services
          </Title>
          <Paragraph className="hero-subtitle">
            Experience world-class hospitality and amenities at LakeSide Hotel.
          </Paragraph>
        </motion.div>
      </div>

      <Content style={{padding: '40px 80px'}}>
        <motion.div
          className="section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.5}}
        >
          <Title level={2} style={{textAlign: 'center', marginBottom: '40px'}}>
            Featured Services
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <motion.div variants={itemVariants}>
                <Card className="service-card">
                  <CoffeeOutlined style={{fontSize: '48px', color: '#1890ff'}}/>
                  <Title level={4}>Restaurant & Bar</Title>
                  <Paragraph>
                    Indulge in a culinary journey with our exquisite menu and fine wines.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div variants={itemVariants}>
                <Card className="service-card">
                  <HeartOutlined style={{fontSize: '48px', color: '#ff4d4f'}}/>
                  <Title level={4}>Spa & Wellness</Title>
                  <Paragraph>
                    Relax and rejuvenate your body and mind with our professional spa treatments.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div variants={itemVariants}>
                <Card className="service-card">
                  <WifiOutlined style={{fontSize: '48px', color: '#14a8fa'}}/>
                  <Title level={4}>Free Wi-Fi</Title>
                  <Paragraph>
                    Stay connected with high-speed internet access available throughout the hotel.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <Divider/>

        <motion.div
          className="section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
        >
          <Row gutter={[32, 32]} align="middle" style={{marginBottom: '40px'}}>
            <Col xs={24} md={12}>
              <motion.div variants={itemVariants}>
                <Image
                  src={restaurantImage}
                  alt="Hotel Restaurant"
                  className="service-image"
                  preview={false}
                />
              </motion.div>
            </Col>
            <Col xs={24} md={12}>
              <motion.div variants={itemVariants}>
                <Title level={2}>Restaurant & Culinary Delights</Title>
                <Paragraph style={{fontSize: '16px', lineHeight: '1.8'}}>
                  Our lakeside restaurant offers a dining experience like no other. Enjoy a blend of local delicacies
                  and international cuisine, prepared by our award-winning chefs. With stunning views of the lake, every
                  meal becomes a memorable occasion.
                </Paragraph>
              </motion.div>
            </Col>
          </Row>

          <Row gutter={[32, 32]} align="middle" style={{marginBottom: '40px'}}>
            <Col xs={24} md={12} className="responsive-order">
              <motion.div variants={itemVariants}>
                <Title level={2}>Relaxing Spa Treatments</Title>
                <Paragraph style={{fontSize: '16px', lineHeight: '1.8'}}>
                  Escape to our tranquil spa and find your inner peace. Our skilled therapists provide a range of
                  massages and treatments using the finest natural products, ensuring a deep sense of relaxation and
                  well-being.
                </Paragraph>
              </motion.div>
            </Col>
            <Col xs={24} md={12}>
              <motion.div variants={itemVariants}>
                <Image
                  src={spaImage}
                  alt="Hotel Spa"
                  className="service-image"
                  preview={false}
                />
              </motion.div>
            </Col>
          </Row>

          <Row gutter={[32, 32]} align="middle" style={{marginBottom: '40px'}}>
            <Col xs={24} md={12}>
              <motion.div variants={itemVariants}>
                <Image
                  src={shuttleImage}
                  alt="Airport Shuttle"
                  className="service-image"
                  preview={false}
                />
              </motion.div>
            </Col>
            <Col xs={24} md={12}>
              <motion.div variants={itemVariants}>
                <Title level={2}>Airport Shuttle Service</Title>
                <Paragraph style={{fontSize: '16px', lineHeight: '1.8'}}>
                  For your convenience, we offer a complimentary airport shuttle service. Our friendly drivers will
                  ensure a smooth and comfortable journey to and from the hotel, taking the stress out of your travel.
                </Paragraph>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <Divider/>

        <motion.div
          className="section"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          viewport={{once: true, amount: 0.5}}
          style={{textAlign: 'center'}}
        >
          <Title level={2}>Need More Information?</Title>
          <Paragraph style={{fontSize: '16px', marginBottom: '20px'}}>
            Contact us today to learn more about our special packages and personalized services. We are here to make
            your stay unforgettable.
          </Paragraph>
          <NavLink to={"/contact"}>
            <Button type="primary" size="large">
              Contact Us
            </Button>
          </NavLink>

        </motion.div>
      </Content>
    </Layout>
  );
};

export default Services;