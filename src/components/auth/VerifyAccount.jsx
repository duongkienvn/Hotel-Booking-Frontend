import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {Card, Spin, Typography} from "antd";

import {MailOutlined} from "@ant-design/icons";
import {getVerifyStatus} from "../utils/ApiFunctions.js";

const {Title, Text} = Typography;

const VerifyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const msg = location.state?.msg;
  const email = location.state?.email;
  const pwd = location.state?.pwd;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await getVerifyStatus(email);
        if (result.isVerified) {
          clearInterval(interval);
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            navigate("/login", {
              state: {
                email: email,
                pwd: pwd
              }
            });
          }, 4000);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isLoading && <Spin tip={"Redirecting to Login..."} fullscreen size={"large"}/>}

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Card
          style={{
            textAlign: "center",
            padding: "40px 20px",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            width: "400px",
            height: 300
          }}
        >
          <MailOutlined style={{fontSize: "48px", color: "#1677ff"}}/>
          <Title level={3} style={{marginTop: "20px"}}>
            Check your email
          </Title>
          <Text type="secondary">
            {msg}
          </Text>
        </Card>
      </div>
    </>

  )
}
export default VerifyAccount
