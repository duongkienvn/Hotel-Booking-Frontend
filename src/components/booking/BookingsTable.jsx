import React, {useEffect, useState} from "react"
import {parseISO} from "date-fns"
import {Button, Empty, Popconfirm, Table, Typography} from "antd"
import DateSlider from "../common/DateSlider"
import {cancelAllBookings} from "../utils/ApiFunctions.js";

const {Text} = Typography

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate)
        const bookingEndDate = parseISO(booking.checkOutDate)
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        )
      })
    }
    setFilteredBookings(filtered)
  }

  useEffect(() => {
    setFilteredBookings(filteredBookings)
  }, [filteredBookings])

  const columns = [
    {title: "S/N", dataIndex: "index", key: "index"},
    {title: "Booking ID", dataIndex: "id", key: "id"},
    {title: "Room ID", dataIndex: ["room", "id"], key: "roomId"},
    {title: "Room Type", dataIndex: ["room", "roomType"], key: "roomType"},
    {title: "Check-In Date", dataIndex: "checkInDate", key: "checkInDate"},
    {title: "Check-Out Date", dataIndex: "checkOutDate", key: "checkOutDate"},
    {title: "Guest Name", dataIndex: "guestName", key: "guestName"},
    {title: "Guest Email", dataIndex: "guestEmail", key: "guestEmail"},
    {title: "Adults", dataIndex: "numOfAdults", key: "numOfAdults"},
    {title: "Children", dataIndex: "numOfChildren", key: "numOfChildren"},
    {title: "Total Guest", dataIndex: "totalNumOfGuests", key: "totalNumOfGuests"},
    {title: "Confirmation Code", dataIndex: "bookingConfirmationCode", key: "confirmationCode"},
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to cancel this booking?"
          onConfirm={() => handleBookingCancellation(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            Cancel
          </Button>
        </Popconfirm>
      ),
    },
  ]

  const dataSource = filteredBookings.map((booking, index) => ({
    ...booking,
    index: index + 1,
    key: booking.id,
  }))

  const handleCancelAllBookings = async () => {
    try {
      await cancelAllBookings();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section style={{padding: 24}}>
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>

      {filteredBookings.length > 0 ? (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20}}>
            <Popconfirm
              title="Are you sure you want to cancel all these booking?"
              onConfirm={() => handleCancelAllBookings()}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Cancel all bookings</Button>
            </Popconfirm>

          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            bordered
            pagination={{pageSize: 5}}
            style={{marginTop: 16}}
          />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
          <Text type="secondary">No booking found for the selected dates</Text>
        }/>
      )}
    </section>
  )
}

export default BookingsTable
