import React, {useState, useEffect} from "react"
import {loginUser} from "../utils/ApiFunctions"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {useAuth} from "./AuthProvider"
import {Alert, Button, Checkbox, Divider, Form, Input, Typography} from "antd"
import Oauth2Client from "./Oauth2Client.jsx";

const {Title, Text} = Typography

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const auth = useAuth()
  const location = useLocation()
  const redirectUrl = location.state?.path || "/"
  const email = location.state?.email;
  const pwd = location.state?.pwd;

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const token = await loginUser(values);
      if (token) {
        auth.handleLogin(token);
        navigate(redirectUrl, {replace: true})
      } else {
        setErrorMessage("Invalid username or password. Please try again.")
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please try again.")
    } finally {
      setLoading(false)
      setTimeout(() => {
        setErrorMessage("")
      }, 4000)
    }
  }

  return (
    <section
      style={{display: "flex", justifyContent: "center"}}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "24px",
          border: "1px solid #f0f0f0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          background: "#fff",
        }}
      >
        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            className="mb-4"
          />
        )}

        <Title level={2} style={{textAlign: "center", marginBottom: "20px"}}>
          Login
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{email: email, password: pwd}}
        >
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
            style={{marginBottom: 5}}
          >
            <Input.Password placeholder="Enter your password"/>
          </Form.Item>

          <Form.Item>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
            <div style={{marginTop: "20px", textAlign: "center"}}>
              Don't have an account? <Link to={"/register"}>Register</Link>
            </div>
          </Form.Item>
        </Form>

        <Divider plain>OR</Divider>

        <Oauth2Client/>
      </div>
    </section>

  )
}

export default Login
