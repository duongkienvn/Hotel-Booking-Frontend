import React, {useEffect, useState} from "react"
import BookingForm from "../booking/BookingForm"
import {useParams} from "react-router-dom"
import {getRoomById} from "../utils/ApiFunctions"
import RoomCarousel from "../common/RoomCarousel"
import { MdOutlineBreakfastDining } from "react-icons/md";
import {CarOutlined, CoffeeOutlined, DesktopOutlined, HomeOutlined, SkinOutlined, WifiOutlined} from "@ant-design/icons"

import {Alert, Card, Col, Image, List, Row, Spin, Table, Typography,} from "antd"

const {Title, Text} = Typography

const Checkout = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  })

  const {roomId} = useParams()

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error.message || "Failed to load room")
          setIsLoading(false)
        })
    }, 100)
  }, [roomId])

  const services = [
    {icon: <WifiOutlined/>, text: "Wifi"},
    {icon: <DesktopOutlined/>, text: "Netflix Premium"},
    {icon: <MdOutlineBreakfastDining />, text: "Breakfast"},
    {icon: <CoffeeOutlined/>, text: "Mini bar refreshment"},
    {icon: <CarOutlined/>, text: "Car Service"},
    {icon: <HomeOutlined/>, text: "Parking Space"},
    {icon: <SkinOutlined/>, text: "Laundry"},
  ]

  return (
    <div className="container">
      <Row gutter={24} style={{marginTop: 32, marginBottom: 32}} align={"stretch"}>
        <Col xs={24} md={12}>
          {isLoading ? (
            <Spin size="large">
              <div>Loading room information...</div>
            </Spin>
          ) : error ? (
            <Alert type="error" message={error}/>
          ) : (
            <Card
              cover={
                <Image
                  alt="Room"
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  style={{height: 200, objectFit: "cover", borderRadius: "8px 8px 0 0"}}
                />
              }
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                height: "100%"
              }}
            >
              <Table
                pagination={false}
                showHeader={false}
                bordered
                dataSource={[
                  {
                    key: "type",
                    label: "Room Type",
                    value: roomInfo.roomType,
                  },
                  {
                    key: "price",
                    label: "Price per night",
                    value: `$${roomInfo.roomPrice}`,
                  },
                  {
                    key: "services",
                    label: "Room Services",
                    value: (
                      <List
                        dataSource={services}
                        renderItem={(item) => (
                          <List.Item style={{padding: "4px 0"}}>
                            {item.icon} <span style={{marginLeft: 8}}>{item.text}</span>
                          </List.Item>
                        )}
                      />
                    ),
                  },
                ]}
                columns={[
                  {
                    dataIndex: "label",
                    key: "label",
                    width: "40%",
                    render: (text) => <Text strong>{text}:</Text>,
                  },
                  {
                    dataIndex: "value",
                    key: "value",
                  },
                ]}
              />
            </Card>
          )}
        </Col>

        <Col xs={24} md={12}>
          <BookingForm/>
        </Col>
      </Row>

      <RoomCarousel/>
    </div>
  )
}

export default Checkout
