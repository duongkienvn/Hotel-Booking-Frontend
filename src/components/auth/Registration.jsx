import React, {useState} from "react"
import {Alert, Button, Form, Input, Spin} from "antd"
import {Link, useNavigate} from "react-router-dom"
import {registerUser} from "../utils/ApiFunctions"

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (values) => {
    try {
      const result = await registerUser(values)
      setIsLoading(true);
      form.resetFields();
      setErrorMessage("");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/verify-account", {
          state:
            {
              msg: result,
              email: values.email,
              pwd: values.password
            }
        });
      }, 2000)
    } catch (error) {
      setErrorMessage(`Registration error : ${error.message}`)
    }
  }

  return (
    <section
      style={{display: "flex", justifyContent: "center"}}
    >
      {isLoading ? (
        <Spin size="large" fullscreen/>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            border: "1px solid #f0f0f0",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          {errorMessage && (
            <Alert
              type="error"
              message={errorMessage}
              showIcon
              style={{marginBottom: 20}}
            />
          )}

          <h2 style={{textAlign: "center", marginBottom: "20px"}}>Register</h2>
          <Form layout="vertical" onFinish={handleRegistration} form={form}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{required: true, message: "Please enter your first name"}]}
            >
              <Input placeholder="Enter your first name"/>
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{required: true, message: "Please enter your last name"}]}
            >
              <Input placeholder="Enter your last name"/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {required: true, message: "Please enter your email"},
                {type: "email", message: "Invalid email format"},
              ]}
            >
              <Input placeholder="Enter your email"/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{required: true, message: "Please enter your password"}]}
            >
              <Input.Password placeholder="Enter your password"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isLoading}>
                Register
              </Button>
              <div style={{marginTop: "10px", textAlign: "center"}}>
                Already have an account? <Link to={"/login"}>Login</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </section>

  )
}

export default Registration
