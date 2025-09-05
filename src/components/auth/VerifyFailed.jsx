import {NavLink, useLocation} from "react-router-dom";
import {Button, Result} from "antd";
import {FrownOutlined} from "@ant-design/icons";

function VerifyFailed() {
  const location = useLocation();
  const errorMsg = location.state?.errorMsg;

  return <>
    <Result
      icon={<FrownOutlined style={{color: "#fc051e"}}/>}
      status="error"
      title={"Verification Failed"}
      subTitle={errorMsg}
      extra={[
        <NavLink to={"/register"}>
          <Button type="primary">
            Register Again
          </Button>
        </NavLink>
      ]}
    />
  </>
}

export default VerifyFailed;