import {addRoom, getRoomTypes} from "../utils/ApiFunctions.js";
import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Form, Input, Row, Select, Space, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {capitalizeWords} from "../utils/Helper.js";

function AddRoom() {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  })
  const [form] = Form.useForm();
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [imagePreview, setImagePreview] = useState("")


  const handleRoomInputChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value)
      } else {
        value = ""
      }
    }
    setNewRoom({...newRoom, [name]: value})
  }

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      const formattedRoomType = capitalizeWords(newRoomType);
      setRoomTypes([...roomTypes, formattedRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (values.roomType === "Add New") {
        setErrorMessage("Please click add that room type and select one!");
        return;
      }
      const success = await addRoom(values.photo[0], values.roomType, values.roomPrice);
      if (success !== undefined) {
        setSuccessMessage("A new room was added successfully!")
        form.resetFields();
        setImagePreview("")
        setErrorMessage("")
      } else {
        setErrorMessage("Error adding new room!")
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return <>
    <Row justify="center" style={{marginTop: 50, marginBottom: 50}}>
      <Col xs={24} md={16} lg={12}>
        <Card title="Add a New Room">
          {successMessage && (
            <Alert
              message={successMessage}
              type="success"
              showIcon
              style={{marginBottom: 16}}
            />
          )}
          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              style={{marginBottom: 16}}
            />
          )}

          <Form layout="vertical" onFinish={handleSubmit} name={"roomForm"} form={form}>
            <Form.Item
              label="Room Type"
              name="roomType"
              rules={[{required: true, message: "Please select a room type"}]}
            >
              <Select
                style={{width: "100%"}}
                placeholder="Select a room type"
                value={newRoom.roomType || undefined}
                onChange={(value) => {
                  if (value === "Add New") {
                    setShowNewRoomTypeInput(true);
                  } else {
                    setShowNewRoomTypeInput(false);
                    handleRoomInputChange({target: {name: "roomType", value}});
                  }
                }}
              >
                <Select.Option value="">Select a room type</Select.Option>
                <Select.Option value="Add New">➕ Add New</Select.Option>
                {roomTypes.map((type, index) => (
                  <Select.Option key={index} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {showNewRoomTypeInput && (
              <div style={{marginBottom: 10}}>
                <Form.Item
                  name="newRoomType"
                  rules={[{ required: true, message: "Please enter new room type" }]}

                >
                  <Input
                    placeholder="Enter New Room Type"
                    value={newRoomType}
                    onChange={(e) => setNewRoomType(e.target.value)}
                  />
                </Form.Item>
                <Button type="primary" onClick={handleAddNewRoomType}>
                  Add
                </Button>
              </div>
            )}

            <Form.Item
              label="Room Price"
              name="roomPrice"
              rules={[{required: true, message: "Please enter room price"}]}
            >
              <Input
                type="number"
                name="roomPrice"
                placeholder={"Please enter room price"}
              />
            </Form.Item>

            <Form.Item
              label="Room Photo"
              name="photo"
              rules={[{required: true, message: "Please upload a room photo"}]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name={"room"}
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Row gutter={16}>
                <Col>
                  <Link to={"/existing-rooms"}>
                    <Button type="default">Existing Rooms</Button>
                  </Link>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Save Room
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  </>
}

export default AddRoom;