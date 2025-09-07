import React from "react";
import { Layout, Typography } from "antd";
import { motion } from "framer-motion";
import parrall from "../../assets/images/hq720.jpg";
import resort from "../../assets/images/life-resort-hotel-resort-hotel-wallpaper-preview.jpg";
import welcome from "../../assets/images/vietgoing_plo2208239073.webp";

const { Content } = Layout;
const { Title } = Typography;

const Parallax = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${parrall})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
        }}
      ></div>

      <Content style={{ position: "relative", zIndex: 1, padding: "0 20px" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Title level={1} style={{ color: "white", marginBottom: 16 }}>
            Experience the Best hospitality at{" "}
            <span style={{ color: "#1890ff" }}>LakeSide Hotel</span>
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <Title level={3} style={{ color: "#f0f0f0", fontWeight: 400 }}>
            We offer the best services for all your needs.
          </Title>
        </motion.div>
      </Content>
    </div>
  );
};

export default Parallax;
