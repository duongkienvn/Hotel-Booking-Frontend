import React, {useEffect, useState} from "react";
import {Button, Card, Divider, Space, Spin, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const {Title, Text} = Typography;

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {

  const checkInDate = dayjs(booking.checkInDate);
  const checkOutDate = dayjs(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <Title
        level={4}
        style={{
          marginBottom: 16,
          fontSize: 22,
          fontWeight: 600,
          color: "#1a1a1a",
        }}
      >
        Reservation Summary
      </Title>

      <Divider style={{ borderTop: "0.5px solid" }}/>

      <div style={{ lineHeight: 1.9, fontSize: 16, color: "#333" }}>
        <p>
          Name: <Text strong style={{ fontSize: 16 }}>{booking.guestFullName}</Text>
        </p>
        <p>
          Email: <Text strong style={{ fontSize: 16 }}>{booking.guestEmail}</Text>
        </p>
        <p>
          Check-in Date:{" "}
          <Text strong style={{ fontSize: 16, color: "#1890ff" }}>
            {checkInDate.format("MMM Do YYYY")}
          </Text>
        </p>
        <p>
          Check-out Date:{" "}
          <Text strong style={{ fontSize: 16, color: "#1890ff" }}>
            {checkOutDate.format("MMM Do YYYY")}
          </Text>
        </p>
        <p>
          Number of Days Booked:{" "}
          <Text strong style={{ fontSize: 16 }}>{numberOfDays}</Text>
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <Title level={5} style={{ color: "#1890ff", marginBottom: 12 }}>
          Number of Guests
        </Title>
        <Text strong style={{ fontSize: 16 }}>
          Adult{booking.numOfAdults > 1 ? "s" : ""}: {booking.numOfAdults}
        </Text>
        <br />
        <Text strong style={{ fontSize: 16 }}>
          Children: {booking.numOfChildren}
        </Text>
      </div>

      {payment > 0 ? (
        <>
          <p
            style={{
              marginTop: 24,
              fontSize: 18,
              fontWeight: 600,
              color: "#222",
            }}
          >
            Total payment:{" "}
            <Text
              strong
              style={{
                fontSize: 20,
                color: "#d4380d",
              }}
            >
              ${payment}
            </Text>
          </p>

          {isFormValid && !isBookingConfirmed ? (
            <Button
              type="primary"
              size="large"
              block
              style={{
                marginTop: 16,
                fontWeight: 600,
                borderRadius: 8,
              }}
              onClick={handleConfirmBooking}
              loading={isProcessingPayment}
            >
              {isProcessingPayment
                ? "Booking Confirmed, redirecting to payment..."
                : "Confirm Booking & Proceed to Payment"}
            </Button>
          ) : isBookingConfirmed ? (
            <Space
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Spin size="large">
                <div>Redirecting...</div>
              </Spin>
            </Space>
          ) : null}
        </>
      ) : (
        <Text
          type="danger"
          style={{
            marginTop: 16,
            display: "block",
            fontSize: 15,
          }}
        >
          Check-out date must be after check-in date.
        </Text>
      )}
    </div>

  );
};

export default BookingSummary;
