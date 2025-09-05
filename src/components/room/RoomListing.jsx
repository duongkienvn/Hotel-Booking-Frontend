import React from "react";
import { Card } from "antd";
import Room from "./Room";

const RoomListing = () => {
  return (
    <Card
      style={{
        backgroundColor: "#f5f5f5",
        padding: "16px",
        marginTop: "40px",
        marginBottom: "40px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}
    >
      <Room />
    </Card>
  );
};

export default RoomListing;
