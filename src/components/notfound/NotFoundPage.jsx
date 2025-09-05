import React from 'react';
import { Button, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '24px',
      }}
    >
      <Result
        status="404"
        title={<Title level={2}>404</Title>}
        subTitle={
          <Paragraph style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            Sorry, the page you visited does not exist.
          </Paragraph>
        }
        extra={
          <Button type="primary" onClick={handleGoHome}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;