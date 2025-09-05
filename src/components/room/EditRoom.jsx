import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Form, Image, Input, Row, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Link, useParams} from "react-router-dom";
import {getRoomById, updateRoom} from "../utils/ApiFunctions";
import {capitalizeWords} from "../utils/Helper.js";

const EditRoom = () => {
  const {id: roomId} = useParams();
  const [form] = Form.useForm();
  const [room, setRoom] = useState({photo: null, roomType: "", roomPrice: ""});
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
        form.setFieldsValue({
          roomType: roomData.roomType,
          roomPrice: roomData.roomPrice
        });
      } catch (error) {
        setErrorMessage("Failed to load room data");
      }
    };
    fetchRoom();
  }, [roomId, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleSubmit = async (values) => {
    try {
      let photoFile = null;
      if (values.photo && values.photo.length > 0) {
        photoFile = values.photo[0].originFileObj;
      }

      const updatedRoom = {
        ...room,
        roomType: capitalizeWords(values.roomType),
        roomPrice: values.roomPrice,
        photo: photoFile
      };

      const response = await updateRoom(roomId, updatedRoom);
      if (response) {
        setSuccessMessage("Room updated successfully!");
        form.setFieldsValue({photo: []});
        setImagePreview(response.photo);
        setRoom(response);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <Row justify="center" style={{marginTop: 50, marginBottom: 50}}>
      <Col xs={24} md={16} lg={12}>
        <Card title="Edit Room">
          {successMessage && (
            <Alert message={successMessage} type="success" showIcon style={{marginBottom: 16}}/>
          )}
          {errorMessage && (
            <Alert message={errorMessage} type="error" showIcon style={{marginBottom: 16}}/>
          )}

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Room Type"
              name="roomType"
              rules={[{required: true, message: "Please enter room type"}]}
            >
              <Input placeholder="Enter room type"/>
            </Form.Item>

            <Form.Item
              label="Room Price"
              name="roomPrice"
              rules={[{required: true, message: "Please enter room price"}]}
            >
              <Input type="number" placeholder="Enter room price"/>
            </Form.Item>

            <Form.Item
              label="Room Photo"
              name="photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="photo" beforeUpload={() => false} maxCount={1} listType="picture">
                <Button icon={<UploadOutlined/>}>Upload New Photo</Button>
              </Upload>
            </Form.Item>
            {imagePreview && (
              <Image
                src={`data:image/jpeg;base64,${imagePreview}`}
                preview={false}
                alt="Room preview"
                style={{marginBottom: 10}}
              />
            )}
            <Form.Item>
              <Row gutter={16}>
                <Col>
                  <Link to="/existing-rooms">
                    <Button type="default">Back</Button>
                  </Link>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Update Room
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EditRoom;
