import React from "react";
import {Button, Card, Col, Image} from "antd";
import {useNavigate} from "react-router-dom";
import BookNowButton from "./BookNowButton.jsx";

const RoomCard = ({room}) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6} style={{marginBottom: 16}}>
      <Card
        hoverable
        cover={
          <Image
            alt="Room Photo"
            src={`data:image/png;base64,${room.photo}`}
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
              aspectRatio: 4 / 3,
              borderRadius: "8px 8px 0 0"
            }}
            preview={false}
          />
        }
      >
        <Card.Meta
          title={<span className="hotel-color"
                       style={{fontSize: 20, fontWeight: "bold", color: "#1890ff"}}>{room.roomType}</span>}
          description={
            <>
              <p className="room-price" style={{
                fontSize: "17px",
                color: "green",
                fontWeight: "bold"
              }}>${room.roomPrice} / night</p>
              <p>Some room information goes here for the guest to read through</p>
              <BookNowButton roomId={room.id}/>
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default RoomCard;
