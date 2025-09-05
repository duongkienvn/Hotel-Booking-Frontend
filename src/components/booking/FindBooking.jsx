import React, {useState} from "react"
import {Alert, Button, Card, Descriptions, Form, Input, Popconfirm, Spin, Typography,} from "antd"
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons"
import {cancelBooking, getBookingByConfirmationCode} from "../utils/ApiFunctions"
import dayjs from "dayjs";

const {Title, Text} = Typography

const FindBooking = () => {
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    bookingConfirmationCode: "",
    room: {id: "", roomType: ""},
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  })

  const emptyBookingInfo = {
    id: "",
    bookingConfirmationCode: "",
    room: {id: "", roomType: ""},
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  }

  const [isDeleted, setIsDeleted] = useState(false)

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(values.confirmationCode)
      setTimeout(() => setBookingInfo(data), 1000);
      setError(null);
    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      setTimeout(() => setError(error.message), 1000);
    }
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.id)
      setIsDeleted(true)
      setSuccessMessage("Booking has been cancelled successfully!")
      setBookingInfo(emptyBookingInfo)
      setError(null)
      form.resetFields();
    } catch (error) {
      setError(error.message)
    }
    setTimeout(() => {
      setSuccessMessage("")
      setIsDeleted(false)
    }, 2000)
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Title level={2}>Find My Booking</Title>

      <Form layout="inline" onFinish={handleFormSubmit} style={{marginBottom: 24}} form={form}>
        <Form.Item style={{flex: 1, width: "100%"}}
                   name="confirmationCode"
                   rules={[{required: true, message: "Please enter booking confimation code"}]}>
          <Input
            placeholder="Enter the booking confirmation code"
          />
        </Form.Item>
        <Form.Item style={{marginRight: 0}}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined/>}
          >
            Find Booking
          </Button>
        </Form.Item>
      </Form>

      {isLoading && (
        <div style={{display: "flex", alignItems: "center", gap: 8, margin: 10}}>
          <Spin/>
          <span>Finding your booking...</span>
        </div>
      )}

      {error && <Alert key={Date.now()} type="error" message={error} closable showIcon style={{marginBottom: 20}}/>}

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          showIcon
          closable
          style={{marginBottom: 20}}
        />
      )}

      {bookingInfo.bookingConfirmationCode && !isDeleted && (
        <Card title="Booking Information" style={{textAlign: "left"}}>
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Confirmation Code">
              <Text strong type="success">{bookingInfo.bookingConfirmationCode}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Room Number">{bookingInfo.room.id}</Descriptions.Item>
            <Descriptions.Item label="Room Type">{bookingInfo.room.roomType}</Descriptions.Item>
            <Descriptions.Item label="Check-in Date">
              {dayjs(bookingInfo.checkInDate).format("MMM Do, YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Check-out Date">
              {dayjs(bookingInfo.checkOutDate).format("MMM Do, YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Full Name">{bookingInfo.guestName}</Descriptions.Item>
            <Descriptions.Item label="Email">{bookingInfo.guestEmail}</Descriptions.Item>
            <Descriptions.Item label="Adults">{bookingInfo.numOfAdults}</Descriptions.Item>
            <Descriptions.Item label="Children">{bookingInfo.numOfChildren}</Descriptions.Item>
            <Descriptions.Item label="Total Guests">{bookingInfo.totalNumOfGuests}</Descriptions.Item>
          </Descriptions>

          <div style={{marginTop: 20, textAlign: "right"}}>
            <Popconfirm
              title="Are you sure you want to cancel this booking?"
              onConfirm={() => handleBookingCancellation(bookingInfo.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined/>}
              >
                Cancel Booking
              </Button>
            </Popconfirm>
          </div>
        </Card>
      )}
    </div>
  )
}

export default FindBooking
