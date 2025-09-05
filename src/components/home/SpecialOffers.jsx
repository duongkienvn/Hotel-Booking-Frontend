import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import {DollarOutlined, GiftOutlined, HeartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {motion} from "framer-motion"; // Import Framer Motion
import hotel_summer from "/public/images/photo-1738780154127-497b8d9dfb99.avif";
import night_hotel from "/public/images/photo-1735494630929-d82e8f7d1977.avif";
import couple from "/public/images/premium_photo-1700353612860-bd8ab8d71f05.avif";

const {Title, Text} = Typography;

const offers = [
  {
    id: 1,
    image: hotel_summer,
    title: "Vibrant Summer Deal",
    description: "Get a 25% discount on all room types when booking at least 2 weeks in advance.",
    icon: <GiftOutlined style={{color: "#fff", fontSize: 24}}/>,
  },
  {
    id: 2,
    image: night_hotel,
    title: "3-Night Getaway Combo",
    description: "Pay for 2 nights and get the 3rd night free. Includes complimentary breakfast.",
    icon: <DollarOutlined style={{color: "#fff", fontSize: 24}}/>,
  },
  {
    id: 3,
    image: couple,
    title: "Romantic Journey Package",
    description: "30% off for couples, including a special room decoration service.",
    icon: <HeartOutlined style={{color: "#fff", fontSize: 24}}/>,
  },
];

const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {y: 20, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};


const headerContainerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const headerItemVariants = {
  hidden: {y: 20, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
  },
};

function SpecialOffers() {
  return (
    <div style={{padding: "80px 0", backgroundColor: "#f0f2f5"}}>
      <motion.div
        style={{textAlign: "center", marginBottom: 64}}
        variants={headerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.5}}
      >
        <motion.div variants={headerItemVariants}>
          <Text strong style={{color: "#777", textTransform: "uppercase", letterSpacing: 1}}>
            Special Offers
          </Text>
        </motion.div>
        <motion.div variants={headerItemVariants}>
          <Title level={2} style={{marginTop: 8, marginBottom: 0, color: "#1a1a1a"}}>
            Explore Our Irresistible Promotions
          </Title>
        </motion.div>
        <motion.div variants={headerItemVariants}>
          <Text type="secondary" style={{fontSize: 16}}>
            Exclusive deals you won't want to miss.
          </Text>
        </motion.div>
      </motion.div>

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.5}}
        >
          <Row gutter={[24, 24]} justify="center">
            {offers.map((offer) => (
              <Col xs={24} md={12} lg={8} key={offer.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                    }}
                    cover={
                      <div style={{
                        height: 200,
                        backgroundImage: `url(${offer.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}>
                        <div style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          backgroundColor: "#1890ff",
                          borderRadius: "50%",
                          width: 50,
                          height: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          {offer.icon}
                        </div>
                      </div>
                    }
                  >
                    <Card.Meta
                      title={offer.title}
                      description={offer.description}
                    />
                    <Link to={"/browse-all-rooms"}>
                      <Button
                        type="primary"
                        block
                        shape="round"
                        style={{marginTop: 24}}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </div>
  );
}

export default SpecialOffers;