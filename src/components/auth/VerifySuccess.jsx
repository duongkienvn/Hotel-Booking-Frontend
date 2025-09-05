import {NavLink, useLocation} from "react-router-dom";
import {Button, Result} from "antd";
import {SmileOutlined} from "@ant-design/icons";

function VerifySuccess() {
  const location = useLocation();
  const successMsg = location.state?.successMsg;

  return <>
    <Result
      icon={<SmileOutlined style={{color: "#52c41a"}}/>}
      status="success"
      title={successMsg}
      subTitle="Your email has been verified. You can now log in to your account."
      extra={[
        <NavLink key={"login"} to={"/login"}>
          <Button type="primary">
            Go to Login
          </Button>
        </NavLink>,
        <NavLink key={"home"} to={"/"}>
          <Button key="home">
            Back to Home
          </Button>
        </NavLink>
      ]}
    />
  </>
}

export default VerifySuccess;