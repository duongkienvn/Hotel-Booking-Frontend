import React, { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import { Row, Col, Button, Space, Alert, Spin, Table } from "antd";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [roomsPerPage] = useState(10);
  const [criteria, setCriteria] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [totalElements, setTotalElements] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const result = await getAllRooms(currentPage - 1, roomsPerPage, criteria);
        setRooms(result.content.reverse());
        setTotalElements(result.totalElements);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [criteria, currentPage, reload]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMessage(`Room No ${roomId} was deleted`);
        setReload(!reload);
      } else {
        console.error(`Error deleting room : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
      align: "center",
    },
    {
      title: "Room Price",
      dataIndex: "roomPrice",
      key: "roomPrice",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, room) => (
        <Space>
          <Link to={`/edit-room/${room.id}`}>
            <Button icon={<EyeOutlined />} type="primary" size="middle" />
          </Link>
          <Link to={`/edit-room/${room.id}`}>
            <Button icon={<EditOutlined />} type="dashed" size="middle" />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            danger
            size="middle"
            onClick={() => handleDelete(room.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      {successMessage && <Alert message={successMessage} type="success" showIcon closable />}
      {errorMessage && <Alert message={errorMessage} type="error" showIcon closable />}

      {isLoading ? (
        <Spin tip="Loading existing rooms..." fullscreen={true} size={"large"}/>
      ) : (
        <>
          <section
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <h2>Existing Rooms</h2>
              </Col>
              <Col>
                <Link to={"/add-room"}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Room
                  </Button>
                </Link>
              </Col>
            </Row>

            <Row style={{ marginBottom: 20 }}>
              <Col span={24}>
                <RoomFilter criteria={criteria} setCriteria={setCriteria}/>
              </Col>
            </Row>

            <Table
              columns={columns}
              dataSource={rooms}
              pagination={false}
              rowKey="id"
              bordered
            />
            <RoomPaginator
              currentPage={currentPage}
              total={totalElements}
              onPageChange={handlePaginationClick}
              pageSize={roomsPerPage}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default ExistingRooms;
