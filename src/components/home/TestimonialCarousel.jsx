import React, {useEffect, useState} from "react";
import {Card, Carousel, Col, Empty, Rate, Row, Space, Typography} from "antd";
import UserAvatar from "../auth/UserAvatar.jsx";
import {getAllApprovedReviews} from "../utils/ApiFunctions.js";
import {motion} from "framer-motion";


const {Title, Text} = Typography;


function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllApprovedReviews();
      setTestimonials(result);
    }
    fetchData()
  }, []);

  return (
    <div style={{padding: "50px 0", backgroundColor: "#f9f9f9"}}>
      <div style={{textAlign: "center", marginBottom: 64}}>
        <Text strong style={{color: "#777", textTransform: "uppercase", letterSpacing: 1}}>
          Happy Customers
        </Text>
        <Title level={2} style={{marginTop: 8, marginBottom: 0, color: "#1a1a1a"}}>
          We deliver what we promise. See
        </Title>
        <Title level={2} style={{marginTop: 0, color: "#1a1a1a"}}>
          what clients are expressing about us.
        </Title>
      </div>

      <div className="container">
        {testimonials && testimonials.length > 0 ? (
          <Carousel
            autoplay
            autoplaySpeed={3000}
            style={{paddingBottom: 40}}
          >
            {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
              <div key={index}>
                <Row gutter={[16, 16]} justify="center">
                  {testimonials.slice(index * 3, index * 3 + 3).map((item) => (
                    <Col xs={24} sm={12} md={12} lg={8} key={item.id}>
                      <motion.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: "easeOut"}}
                        viewport={{once: true}}
                        style={{flex: 1}}
                      >
                        <Card
                          key={item.id}
                          style={{
                            borderRadius: 16,
                            background: "#fff",
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                          }}
                          styles={{body: {padding: 0, flex: 1, display: "flex", flexDirection: "column"}}}
                        >
                          <div style={{marginBottom: 16}}>
                            <UserAvatar userId={item.user.email} size={60}/>
                          </div>

                          <Rate disabled defaultValue={item.rating} style={{marginBottom: 16}}/>

                          <p
                            style={{
                              fontSize: 16,
                              lineHeight: "1.6",
                              color: "#555",
                              marginBottom: 16,
                              flexGrow: 1,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {item.content}
                          </p>

                          <Space direction="vertical" size={2}>
                            <b
                              style={{
                                fontSize: 16,
                                color: "#1a1a1a",
                              }}
                            >
                              {item.user.firstName + " " + item.user.lastName}
                            </b>
                            <Text type="secondary" style={{fontSize: 14}}>
                              {"Customer"}
                            </Text>
                          </Space>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Carousel>
        ) : (
          <Empty
            description="No reviews yet. Be the first to write one!"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{marginTop: 32}}
          />
        )}
      </div>
    </div>
  );
};
export default TestimonialCarousel;