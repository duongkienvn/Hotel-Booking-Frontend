import React from "react";
import { Layout, Typography, Row, Col } from "antd";
import { motion } from "framer-motion";
import services4 from "../../assets/images/istockphoto-2158090532-612x612.webp";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = ({ title }) => {
  return (
    <AntHeader
      style={{
        position: "relative",
        height: "250px",
        backgroundImage: `url(${services4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
        }}
      />

      <Row
        justify="center"
        align="middle"
        style={{ width: "100%", height: "100%", zIndex: 1 }}
      >
        <Col>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Title
              level={1}
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: "3rem",
                margin: 0,
                textShadow: "0px 4px 12px rgba(0,0,0,0.6)",
                transition: "all 0.3s ease",
              }}
              className="header-title"
            >
              {title}
            </Title>
          </motion.div>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
