import React, {useEffect, useState} from "react";
import {useLocation, Link, useNavigate} from "react-router-dom";
import {Result, Button, Spin} from "antd";
import Header from "../common/Header";

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 500)
  }, []);

  return (
    <div style={{ minHeight: "80vh" }}>
      {isLoading ? <Spin fullscreen size={"large"} /> : (
        <>
          <Header title="Booking Status" />

          <div style={{ marginTop: 40 }}>
            {message ? (
              <Result
                status="success"
                title="Booking Successful!"
                subTitle={message}
                extra={[
                  <Link to="/" key="home">
                    <Button type="primary">Go Home</Button>
                  </Link>,
                  <Link to="/browse-all-rooms" key="browse">
                    <Button>Browse More Rooms</Button>
                  </Link>,
                ]}
              />
            ) : (
              <Result
                status="error"
                title="Booking Failed"
                subTitle={error || "Something went wrong. Please try again later."}
                extra={[
                  <Link to="/" key="home">
                    <Button type="primary">Go Home</Button>
                  </Link>,
                  <Button onClick={() => navigate(-2)}>Try Again</Button>
                ]}
              />
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default BookingSuccess;
