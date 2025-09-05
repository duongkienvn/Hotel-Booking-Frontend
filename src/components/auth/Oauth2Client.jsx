import {Button, Col, Row} from "antd";
import React from "react";

function Oauth2Client() {
  const googleLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  }

  const facebookLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/facebook";
  }

  return <>
    <Row gutter={16} justify="center">
      <Col span={12}>
        <Button
          block
          style={{
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: 500,
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onClick={() => googleLogin()}
        >
          <img
            src="/images/google.svg"
            alt="Google"
            style={{width: "24px", height: "24px"}}
          />
          Login with Google
        </Button>
      </Col>

      <Col span={12}>
        <Button
          block
          style={{
            backgroundColor: "#fff",
            color: "black",
            fontWeight: 500,
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onClick={() => facebookLogin()}
        >
          <img
            src="/images/facebook.svg"
            alt="Facebook"
            style={{width: "24px", height: "24px"}}
          />
          Login with Facebook
        </Button>
      </Col>
    </Row>
  </>
}

export default Oauth2Client;