import { Button, Card, Form, Input, Layout } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const contentStyle = {
  marginTop: "10%",
};

const cardStyle = {
  width: "300px",
  margin: "0 auto",
};

function Register() {
  const [errors, seterrors] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (values: any) => {
    try {
      const response = await fetch(
        "https://kanban-back-ctja.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        navigate("/login");
        // You can handle success, e.g., redirect to login page
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        seterrors("Registration failed:");
        // You can handle errors, e.g., display an error message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      seterrors("Registration failed:");
      // You can handle general errors, e.g., display an error message
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        <Card title="Register" style={cardStyle}>
          <Form name="register" onFinish={onSubmitHandler}>
            <Form.Item
              htmlFor="name"
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              htmlFor="email"
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              htmlFor="password"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Minimo 6 caracteres",
                  min: 6,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button size="large" htmlType="submit">
              Register
            </Button>
            <p>{errors}</p>
          </Form>
        </Card>
        <Button size="large" onClick={handleLogin}>
          Iniciar sesion
        </Button>
      </Content>
    </Layout>
  );
}

export default Register;
