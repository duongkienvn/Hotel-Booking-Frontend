import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Typography} from "antd";
import {bookRoom, getRoomById} from "../utils/ApiFunctions";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import BookingSummary from "./BookingSummary.jsx";

dayjs.extend(isSameOrBefore);

const {Title} = Typography;

const BookingForm = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUser = localStorage.getItem("userId");
  const {roomId} = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser || "",
    checkInDate: null,
    checkOutDate: null,
    numOfAdults: 1,
    numOfChildren: 0,
  });

  useEffect(() => {
    const getRoomPriceById = async (roomId) => {
      try {
        const response = await getRoomById(roomId);
        setRoomPrice(response.roomPrice);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    if (!booking.checkInDate || !booking.checkOutDate) return 0;
    const checkInDate = dayjs(booking.checkInDate)
    const checkOutDate = dayjs(booking.checkOutDate)
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays > 0 ? diffInDays * paymentPerDay : 0;
  };

  const handleSubmit = (values) => {
    if (dayjs(values.checkOutDate).isSameOrBefore(dayjs(values.checkInDate))) {
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }
    setIsModalVisible(true);
    setErrorMessage("");
    setBooking(values);
  };

  const handleFormSubmit = async () => {
    try {
      const successMessage = await bookRoom(roomId, booking);
      navigate("/booking-success", {state: {message: successMessage}});
    } catch (error) {
      const errorMsg = error.message;
      navigate("/booking-success", {state: {error: errorMsg}});
    }
  };

  return (
    <>
      <Card title={<Title level={4}>Reserve Room</Title>} style={{height: "100%"}}>
        <Form
          form={form}
          layout="vertical"
          initialValues={booking}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Fullname"
            name="guestFullName"
            rules={[{required: true, message: "Please enter your fullname"}]}
          >
            <Input placeholder="Enter your fullname"/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="guestEmail"
            rules={[{required: true, type: "email", message: "Enter a valid email"}]}
          >
            <Input placeholder="Enter your email"/>
          </Form.Item>

          <Title level={5} style={{marginTop: 20}}>Lodging Period</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Check-in Date"
                name="checkInDate"
                rules={[{required: true, message: "Please select a check-in date"}]}
              >
                <DatePicker
                  style={{width: "100%"}}
                  disabledDate={(current) => current && current < dayjs().startOf("day")}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Check-out Date"
                name="checkOutDate"
                rules={[{required: true, message: "Please select a check-out date"}]}
              >
                <DatePicker style={{width: "100%"}}/>
              </Form.Item>
            </Col>
          </Row>
          {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

          <Title level={5} style={{marginTop: 20}}>Number of Guests</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Adults"
                name="numOfAdults"
                rules={[{required: true, message: "At least 1 adult required"}]}
              >
                <InputNumber min={1} style={{width: "100%"}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Children"
                name="numOfChildren"
                rules={[{required: true}]}
              >
                <InputNumber min={0} style={{width: "100%"}}/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{marginTop: 20}}>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <BookingSummary
          booking={booking}
          payment={calculatePayment()}
          onConfirm={handleFormSubmit}
          isFormValid={true}
        />
      </Modal>
    </>

  );
};

export default BookingForm;
