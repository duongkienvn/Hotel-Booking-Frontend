import React, { useState, useEffect } from "react"
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions"
import Header from "../common/Header"
import BookingsTable from "./BookingsTable"
import {Spin, Alert, Typography, Empty} from "antd"

const { Text } = Typography

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data.content)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error.message)
          setIsLoading(false)
        })
    }, 1000)
  }, [bookingInfo])

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId)
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section style={{ backgroundColor: "whitesmoke", paddingBottom: 32 }}>
      <Header title="Existing Bookings" />

      <div style={{ padding: "16px" }}>
        {error && <Alert message="Error" description={error} type="error" showIcon closable />}

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            <Spin size="large" />
          </div>
        ) : bookingInfo.length > 0 ? (
          <BookingsTable
            bookingInfo={bookingInfo}
            handleBookingCancellation={handleBookingCancellation}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
            <Text type="secondary">
              No bookings available.
            </Text>
          }/>
        )}
      </div>
    </section>
  )
}

export default Bookings
