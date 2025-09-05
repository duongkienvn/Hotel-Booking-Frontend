import React, {useEffect, useState} from "react";
import {getUser, updateProfile} from "../utils/ApiFunctions";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, Col, Form, Input, message, Row, Spin, Typography} from "antd";
import UserAvatar from "./UserAvatar.jsx";

const {Title} = Typography;

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userId");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userEmail);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Failed to fetch user information: " + error.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [userEmail, form]);

  const onFinish = async (values) => {
    try {
      const userRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber
      };
      const updatedUser = await updateProfile(userEmail, userRequest);
      setUser(updatedUser);
      message.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      message.error(error.message || "Failed to update profile.");
    }
  };


  if (loading) {
    return <Spin tip="Loading user data..." fullscreen/>;
  }

  return (
    <div className="container mt-5">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card className="shadow-lg p-3">
            <Title level={3} className="text-center">
              Update Profile
            </Title>
            {errorMessage && <Alert message={errorMessage} type="error" showIcon className="mb-4"/>}

            <div style={{textAlign: "center", marginBottom: "24px"}}>
              <UserAvatar userId={userEmail} size={150}/>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={user}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{required: true, message: "Please input your first name!"}]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{required: true, message: "Please input your last name!"}]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {required: true, message: "Please input your email!"},
                  {type: "email", message: "The input is not a valid E-mail!"}
                ]}
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                label="Phone Number (Optional)"
                name="phoneNumber"
                rules={[
                  {pattern: /^\d{10,15}$/, message: "Invalid phone number!"}
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-100">
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateProfile;