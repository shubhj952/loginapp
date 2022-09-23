import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  let data = useState({});
  const [formData, setFormData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [loginTrue, setLoginTrue] = useState(false);

  const updateData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const checkData = () => {
      data = localStorage.getItem("loginData");
      axios
        .post(``, data)
        .then((res) => {
          if (res.data.check === 200) {
            setLoginTrue(true);
          }
        })
        .catch((error) => console.log(error));
    };

    checkData();
  }, [data]);

  const checkLogin = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(``, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.check === 200) {
          setLoginTrue(true);
          setLoginData(res.data.data);
          localStorage.setItem("login_data", JSON.stringify(loginData));
          console.log(localStorage);
        } else {
          console.log("Not WOrking");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <>
        {loginTrue ? (
          <Dashboard />
        ) : (
          <Modal show={true} centered>
            <Modal.Header className="text-center w-100" style={{ backgroundColor: "#b18bbe" }}>
              <Modal.Title className="text-center w-100">Login</Modal.Title>
            </Modal.Header>
            <Modal.Body className="justify-content-right w-100">
              <Form onSubmit={checkLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={updateData}
                    placeholder="Enter User Name..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={updateData}
                    placeholder="Enter your password here..."
                  />
                </Form.Group>
                <Button type="submit">Login</Button>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </>
    </div>
  );
}

export default App;
