import { Button, Card, Form, Input, Layout } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
const { Header, Footer, Content } = Layout;

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const contentStyle = {
  marginTop: "10%",
};

const cardLogin = {
  width: "300px",
  margin: "0 auto",
};
function Login() {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const onSubmitHandler = async (values: any) => {
    try {
      const response = await fetch(
        "https://kanban-back-ctja.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      console.log("res---", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);

        // Aquí puedes almacenar el token en el contexto o en el estado global
        // para que esté disponible en otros componentes después del inicio de sesión exitoso.

        // Redirigir al usuario a la página deseada después del inicio de sesión
        handleLogin(data.token, data.user);
        navigate("/kanban");
      } else {
        console.error("Login failed");
        setErrors("Credenciales incorrectas");
        // Manejar el caso en que el inicio de sesión falla (mostrar mensaje de error, etc.)
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        <Card title="Iniciar Sesion" style={cardLogin}>
          <Form name="login" onFinish={onSubmitHandler}>
            <Form.Item
              htmlFor="email"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: `Please input your email!`,
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              htmlFor="password"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: `Please input your password!`,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button size="large" htmlType="submit">
              Login
            </Button>
            <p>{errors}</p>
          </Form>
        </Card>
        <Button size="large" onClick={() => navigate("/")}>
          Registrarse
        </Button>
      </Content>
    </Layout>
  );
}

export default Login;
