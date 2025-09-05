import React from "react";
import {Button, Layout, Typography} from "antd";
import {motion} from "framer-motion";
import welcome from "../../assets/images/vietgoing_plo2208239073.webp";
import {Link} from "react-router-dom";
import {ArrowRightOutlined} from "@ant-design/icons";

const {Header} = Layout;
const {Title, Text} = Typography;

const MainHeader = () => {
  return (
    <Header
      style={{
        position: "relative",
        height: "60vh",
        backgroundImage: `url(${welcome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      <motion.div
        style={{position: "relative", zIndex: 1}}
        initial={{opacity: 0, y: -40}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1, ease: "easeOut"}}
      >
        <Title level={1} style={{color: "#fff"}}>
          Welcome to{" "}
          <motion.span
            style={{color: "#1890ff", display: "inline-block"}}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: 0.5, duration: 0.6}}
          >
            LakeSide Hotel
          </motion.span>
        </Title>

        <motion.div
          initial={{opacity: 0, y: 40}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.8, duration: 0.8}}
        >
          <Text style={{color: "#fff", fontSize: "18px"}}>
            Experience the Best Hospitality in Town
          </Text>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 1.2, duration: 0.8}}
        >
          <Link to={"/browse-all-rooms"}>
            <Button type={"primary"} size={"large"} icon={<ArrowRightOutlined/>}>
              Explore Rooms
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </Header>
  );
};

export default MainHeader;
