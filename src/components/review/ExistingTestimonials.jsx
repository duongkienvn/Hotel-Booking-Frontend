import {useEffect, useState} from "react";
import {Button, Space, Table, Tag} from "antd";
import {approveReview, getAllReviews, rejectReview} from "../utils/ApiFunctions";

const ExistingTestimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [reload, setReload] = useState(false)

  const onReLoad = () => {
    setReload(!reload);
  }

  useEffect(() => {
    loadPendingReviews();
  }, [reload]);

  const loadPendingReviews = async () => {
    const data = await getAllReviews();
    setReviews(data);
  };

  const handleApprove = async (id) => {
    await approveReview(id);
    onReLoad();
  };

  const handleReject = async (id) => {
    await rejectReview(id);
    onReLoad();
  };

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id"
    },
    {
      title: "Username",
      key: "username",
      render: (_, record) => `${record.user.firstName} ${record.user.lastName}`
    },
    {
      title: "Comment",
      dataIndex: "content",
      key: "content"
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating"
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        record.approved ? (
          <Tag color={"green"}>Approved</Tag>
        ) : (
          <Space>
            <Button type="primary" onClick={() => handleApprove(record.id)}>Approve</Button>
            <Button danger onClick={() => handleReject(record.id)}>Reject</Button>
          </Space>
        )
      )
    }
  ];

  return (
    <div className={"container"}>
      <Table dataSource={reviews} columns={columns} rowKey="id"/>
    </div>
  );
};

export default ExistingTestimonials;
