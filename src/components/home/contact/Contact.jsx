import React from 'react';
import {Button, Card, Col, Form, Input, Layout, message, Row, Typography,} from 'antd';
import {motion} from 'framer-motion';
import {EnvironmentOutlined, MailOutlined, PhoneOutlined,} from '@ant-design/icons';
import './Contact.css';
import contactBg from "../../../assets/images/pexels-pixabay-261102.jpg";
import TextArea from "antd/es/input/TextArea.js";

const {Content} = Layout;
const {Title, Paragraph} = Typography;


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

const Contact = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Message sent successfully',
      style: {
        zIndex: 9000
      }
    });
  };

  const onFinish = () => {
    setTimeout(() => {
      success();
      form.resetFields();
    }, 800);
  };

  return (
    <>
      {contextHolder}
      <Layout>
        <div className="contact-hero-section" style={{
          backgroundImage: `url(${contactBg})`,
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
              Contact Us
            </Title>
            <Paragraph className="hero-subtitle">
              We are here to assist you with any inquiries.
            </Paragraph>
          </motion.div>
        </div>

        <Content style={{padding: '40px 80px'}}>
          <motion.div
            className="section"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            viewport={{once: true, amount: 0.5}}
          >
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <motion.div variants={itemVariants}>
                  <Card className="contact-info-card">
                    <Title level={2}>Get in Touch</Title>
                    <Paragraph>
                      Feel free to reach out to us for reservations, special requests, or any questions you may have.
                      Our
                      team is ready to help you plan your perfect stay.
                    </Paragraph>
                    <div className="info-item">
                      <EnvironmentOutlined/>
                      <span>123 West Lake Street, Hanoi</span>
                    </div>
                    <div className="info-item">
                      <PhoneOutlined/>
                      <span>+84 123 456 789</span>
                    </div>
                    <div className="info-item">
                      <MailOutlined/>
                      <span>info@lakesidehotel.com</span>
                    </div>
                    <div style={{marginTop: "20px", borderRadius: "12px", overflow: "hidden"}}>
                      <iframe
                        title="LakeSide Hotel Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502300178916!2d106.70042331526062!3d10.776889892321542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292f5a7ed7%3A0xf6dbfffa6c6714!2sHotel!5e0!3m2!1sen!2s!4v1610000000000!5m2!1sen!2s"
                        width="100%"
                        height="250"
                        style={{border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={12}>
                <motion.div variants={itemVariants}>
                  <Card className="contact-form-card">
                    <Title level={2}>Send a Message</Title>
                    <Form
                      name="contact"
                      layout="vertical"
                      onFinish={onFinish}
                      form={form}
                    >
                      <Form.Item
                        name="name"
                        label="Your Name"
                        rules={[{required: true, message: 'Please enter your name!'}]}
                      >
                        <Input placeholder="Your full name"/>
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Your Email"
                        rules={[{required: true, type: 'email', message: 'Please enter a valid email!'}]}
                      >
                        <Input placeholder="your@email.com"/>
                      </Form.Item>
                      <Form.Item
                        name="message"
                        label="Your Message"
                        rules={[{required: true, message: 'Please enter your message!'}]}
                      >
                        <TextArea rows={6} placeholder="Write your message here..."/>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Send Message
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Content>
      </Layout>
    </>

  );
};

export default Contact;