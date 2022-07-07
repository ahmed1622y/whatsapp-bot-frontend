import { Button, Form, Input } from "antd";
import axios from "axios";
import url from "./url";
import { AuthContext } from "./context";
import { useState, useContext } from "react";
export const Login = () => {
  const [, setAuth] = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function submit() {
    axios
      .post(url + "/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        setAuth([true, true, res.data]);
      })
      .catch((err) => {});
  }
  return (
    <div className="login">
      <div className="form">
        {" "}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={submit}
          autoComplete="off"
        >
          <Form.Item label="Username" name="username">
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
