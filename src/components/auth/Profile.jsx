import React, {useEffect, useState} from "react"
import {addReview, deleteUser, getBookingsByUserId, getUser, getUserAvatar, uploadImage} from "../utils/ApiFunctions"
import {useNavigate} from "react-router-dom"
import dayjs from "dayjs"
import {
  Alert,
  Button,
  Card,
  Empty,
  Form,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Rate,
  Space,
  Spin,
  Table,
  Typography,
  Upload
} from "antd";
import {EditOutlined} from '@ant-design/icons';
import UserAvatar from "./UserAvatar.jsx";

const {Title, Text} = Typography
const {TextArea} = Input;

const Profile = () => {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [messageText, setMessageText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token");
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onReLoad = () => {
    setReload(!reload);
  }

  const handleReviewSubmit = async () => {
    const values = await form.validateFields();
    const reviewRequest = {
      content: values.content,
      rating: values.rating
    };
    try {
      const result = await addReview(reviewRequest);
      if (result) {
        setIsModalOpen(false)
        form.resetFields();
        success("Review submitted successfully!");
      }
    } catch (err) {
      error(err.message);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData)
      } catch (error) {
        console.error(error)
        setErrorMessage("Failed to fetch user information")
      }
    }
    fetchUser()
  }, [userId])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userId, token)
        setBookings(response)
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    fetchBookings()
  }, [userId, token])

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(userId)
      message.success("Account deleted successfully")
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("userRole")
      navigate("/")
      window.location.reload()
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const bookingColumns = [
    {title: "Booking ID", dataIndex: "id", key: "id", responsive: ["sm"],},
    {title: "Room ID", dataIndex: ["room", "id"], key: "roomId", responsive: ["sm"],},
    {title: "Room Type", dataIndex: ["room", "roomType"], key: "roomType"},
    {
      title: "Check In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (date) => dayjs(date).format("MMM DD, YYYY")
    },
    {
      title: "Check Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (date) => dayjs(date).format("MMM DD, YYYY")
    },
    {title: "Confirmation Code", dataIndex: "bookingConfirmationCode", key: "code"},
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const isPastCheckout = dayjs(record.checkOutDate).isBefore(dayjs(), "day");
        return isPastCheckout ? (
          <Text type="success">Completed</Text>
        ) : (
          <Text type="success">On-going</Text>
        );
      }
    }
  ]

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
      style: {
        zIndex: 9999
      }
    });
  };

  const error = (err) => {
    messageApi.open({
      type: 'error',
      content: err,
      style: {
        zIndex: 9999
      }
    });
  };

  const beforeUploadCheck = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };

  const handleUpload = async ({file, onSuccess, onError}) => {
    const formData = new FormData();
    formData.append("photo", file);
    setLoading(true);
    try {
      const result = await uploadImage(user.id, formData);
      await getUserAvatar(result);
      onReLoad();
      success('Avatar updated!');
      onSuccess("ok");
    } catch (err) {
      error(err);
      onError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
      <div className="container mt-5">
        {errorMessage && <Alert type="error" message={errorMessage} showIcon closable/>}
        {messageText && <Alert type="success" message={messageText} showIcon closable/>}

        {user ? (
          <Card title="User Information" variant className="shadow">
            <Space align="start">
              <Space direction={"vertical"}>
                <UserAvatar userId={userId} size={120} reload={reload}/>
                <Upload
                  customRequest={handleUpload}
                  showUploadList={false}
                  beforeUpload={beforeUploadCheck}
                  accept="image/png,image/jpeg"
                >
                  <Button type="link" icon={<EditOutlined/>} size="small" loading={loading}>
                    Edit Image
                  </Button>
                </Upload>
              </Space>
              <List
                itemLayout="horizontal"
                dataSource={[
                  {label: "ID", value: user.id},
                  {label: "First Name", value: user.firstName},
                  {label: "Last Name", value: user.lastName},
                  {label: "Email", value: user.email},
                  {label: "Phone Number", value: user.phoneNumber || "Not provided"}
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Text strong style={{width: 120}}>
                      {item.label}:
                    </Text>
                    <Text>{item.value}</Text>
                  </List.Item>
                )}
              />
            </Space>

            <Title level={4} style={{margin: 0}}>
              Roles
            </Title>
            <List
              dataSource={user.roles}
              renderItem={(role) => <List.Item>{role.name}</List.Item>}
            />
            <Title level={4} className="mt-5">
              Booking History
            </Title>
            {bookings.length > 0 ? (
              <Table
                columns={bookingColumns}
                dataSource={bookings}
                rowKey="id"
                bordered
                scroll={{ x: "max-content" }}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
                <Text type="secondary">You have not made any bookings yet.</Text>
              }/>
            )}

            <Space direction="vertical">
              <Space>
                <Button
                  type="primary"
                  onClick={() => navigate(`/update-profile`)}
                >
                  Update Information
                </Button>

                {bookings.length > 0 && (
                  <>
                    <Modal
                      title="Write a Review"
                      open={isModalOpen}
                      onOk={handleReviewSubmit}
                      onCancel={() => setIsModalOpen(false)}
                      okText="Submit"
                      cancelText="Cancel"
                    >
                      <Form form={form} layout="vertical">
                        <Form.Item
                          name="rating"
                          label="Rating"
                          rules={[{ required: true, message: "Please give a rating" }]}
                        >
                          <Rate />
                        </Form.Item>
                        <Form.Item
                          name="content"
                          label="Your Review"
                          rules={[{ required: true, message: "Please enter your review" }]}
                        >
                          <Input.TextArea rows={7} placeholder="Share your experience..." />
                        </Form.Item>
                      </Form>
                    </Modal>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                      Write Review
                    </Button>
                  </>
                )}
              </Space>

              <Popconfirm
                title="Are you sure to delete this account?"
                onConfirm={handleDeleteAccount}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete Account
                </Button>
              </Popconfirm>
            </Space>
          </Card>
        ) : (
          <Spin tip={"Loading user data..."} fullscreen/>
        )}
      </div>
    </>

  )
}

export default Profile
