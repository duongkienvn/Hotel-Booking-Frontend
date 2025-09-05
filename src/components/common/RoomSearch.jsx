import React, {useEffect, useState} from "react"
import {Button, Col, DatePicker, Empty, Row, Select, Space, Spin, Typography} from "antd"
import dayjs from "dayjs"
import {getAvailableRooms, getRoomTypes} from "../utils/ApiFunctions"
import RoomSearchResults from "./RoomSearchResult"
// import RoomTypeSelector from "./RoomTypeSelector"

const {Title, Text} = Typography
const {RangePicker} = DatePicker
const {Option} = Select

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: null,
    checkOutDate: null,
    roomType: ""
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [availableRooms, setAvailableRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRoomTypes();
      setRoomTypes(result);
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.checkInDate || !searchQuery.checkOutDate) {
      setErrorMessage("Please select valid dates")
      return
    }
    if (searchQuery.checkOutDate.isBefore(searchQuery.checkInDate)) {
      setErrorMessage("Check-out date must be after check-in date")
      return
    }

    setIsLoading(true)
    try {
      const response = await getAvailableRooms(
        searchQuery.checkInDate.format("YYYY-MM-DD"),
        searchQuery.checkOutDate.format("YYYY-MM-DD"),
        searchQuery.roomType
      )
      setAvailableRooms(response);
      setErrorMessage("")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateChange = (dates) => {
    if (dates) {
      setSearchQuery({...searchQuery, checkInDate: dates[0], checkOutDate: dates[1]})
      setErrorMessage("")
    } else {
      setSearchQuery({...searchQuery, checkInDate: null, checkOutDate: null})
    }
  }

  const handleRoomTypeChange = (value) => {
    setSearchQuery({...searchQuery, roomType: value})
  }

  const handleClearSearch = () => {
    setSearchQuery({checkInDate: null, checkOutDate: null, roomType: ""})
    setAvailableRooms([])
    setErrorMessage("")
  }

  return (
    <div style={{padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)"}}>
      <Title level={4} style={{textAlign: "center", marginBottom: 24}}>Search Rooms</Title>
      <Row gutter={16} justify="center" align="middle">
        <Col xs={24} md={8}>
          <RangePicker
            style={{width: "100%"}}
            value={
              searchQuery.checkInDate && searchQuery.checkOutDate
                ? [searchQuery.checkInDate, searchQuery.checkOutDate]
                : []
            }
            onChange={handleDateChange}
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </Col>
        <Col xs={24} md={6}>
          <Select
            placeholder="Select Room Type"
            style={{width: "100%"}}
            value={searchQuery.roomType || undefined}
            onChange={handleRoomTypeChange}
            allowClear
          >
            {roomTypes.length > 0 && roomTypes.map(roomType => (
              <Option value={roomType}>{roomType}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Space>
            <Button type="primary" onClick={handleSearch}>Search</Button>
            <Button onClick={handleClearSearch}>Clear</Button>
          </Space>
        </Col>
      </Row>

      {errorMessage && <Text type="danger" style={{display: "block", marginTop: 16}}>{errorMessage}</Text>}

      <div style={{marginTop: 24}}>
        {isLoading ? (
          <Spin>
            <div>Finding available rooms...</div>
          </Spin>
        ) : availableRooms.length > 0 ? (
          <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch}/>
        ) : (
          searchQuery.checkInDate &&
          <Empty
            styles={{image: {height: 60}}}
            description={
              <Typography.Text>
                No rooms available for the selected dates and room type.
              </Typography.Text>
            }
          >
          </Empty>
        )}
      </div>
    </div>
  )
}

export default RoomSearch
