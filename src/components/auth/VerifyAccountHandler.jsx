import {useNavigate, useSearchParams} from "react-router-dom";
import {Spin} from "antd";
import {useEffect, useState} from "react";
import {verifyAccount} from "../utils/ApiFunctions.js";

function VerifyAccountHandler() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await verifyAccount(token);
        if (result) {
          setTimeout(() => {
            setLoading(false);
            navigate("/verify-success", {state: {successMsg: result}});
          }, 2000);
        }
      } catch (err) {
        setTimeout(() => {
          setLoading(false);
          navigate("/verify-failed", {state: {errorMsg: err.message}});
        }, 2000);
      }
    };
    if (token) fetchApi();
  }, [token, navigate]);

  return (
    <>
      {loading && (
        <Spin tip="Verifying your account..." size="large" fullscreen/>
      )}
    </>
  )
}

export default VerifyAccountHandler;