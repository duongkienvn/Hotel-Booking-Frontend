import React, {useEffect, useState} from "react";
import {getAllRooms} from "../utils/ApiFunctions";
import RoomCard from "./RoomCard";
import RoomFilter from "../common/RoomFilter";
import {Alert, Col, Empty, Row, Spin, Typography} from "antd";
import RoomPaginator from "../common/RoomPaginator.jsx";

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [totalRooms, setTotalRooms] = useState(0);
  const [criteria, setCriteria] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const rooms = await getAllRooms(currentPage - 1, roomsPerPage, criteria);
        setData(rooms.content.reverse());
        setTotalRooms(rooms.totalElements);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, [currentPage, criteria, roomsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderRooms = () => {
    return data.map((room) => (
      <RoomCard key={room.id} room={room}/>
    ))
  };

  if (isLoading) {
    return (
      <Spin size="large">
        <div style={{padding: 20}}>Loading rooms...</div>
      </Spin>
    );
  }

  if (error) {
    return (
      <div style={{padding: 20}}>
        <Alert message="Error" description={error} type="error" showIcon/>
      </div>
    );
  }

  return (
    <div className={"container"}>
      <Row gutter={[16, 16]} justify="space-between" align="middle" style={{marginBottom: 16}}>
        <Col span={24}>
          <RoomFilter criteria={criteria} setCriteria={setCriteria}/>
        </Col>
      </Row>
      {data.length > 0 ? (
        <>
          <Row gutter={[16, 16]}>{renderRooms()}</Row>

          <Row justify="center" style={{marginTop: 16}}>
            <Col>
              <RoomPaginator
                currentPage={currentPage}
                total={totalRooms}
                onPageChange={handlePageChange}
                pageSize={roomsPerPage}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
               description={
                 <Typography.Text>
                   No rooms available
                 </Typography.Text>
               }
        />
      )}
    </div>
  );
};

export default Room;
