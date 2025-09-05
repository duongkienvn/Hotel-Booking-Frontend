import React, { useState } from "react"
import { DatePicker, Button, Typography, Space } from "antd"

const { RangePicker } = DatePicker
const { Title } = Typography

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dates, setDates] = useState([])

  const handleChange = (values) => {
    setDates(values)
    if (values && values.length === 2) {
      const [start, end] = values
      onDateChange(start?.toDate(), end?.toDate())
      onFilterChange(start?.toDate(), end?.toDate())
    } else {
      onDateChange(null, null)
      onFilterChange(null, null)
    }
  }

  const handleClearFilter = () => {
    setDates([])
    onDateChange(null, null)
    onFilterChange(null, null)
  }

  return (
    <div>
      <Title level={5} style={{ marginBottom: 16 }}>
        Filter bookings by date
      </Title>

      <Space direction="vertical" size="middle">
        <RangePicker
          value={dates}
          onChange={handleChange}
          format="DD/MM/YYYY"
          style={{ width: "100%" }}
          allowClear
        />
        <Button onClick={handleClearFilter}>Clear Filter</Button>
      </Space>
    </div>
  )
}

export default DateSlider
