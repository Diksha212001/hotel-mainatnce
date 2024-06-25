import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button as BootstrapButton, Container, Row, Col } from "react-bootstrap";
import { useUserAuth } from "../contexts/UserAuthContext";
import styled from "styled-components";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { uid } from "uid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const Button = styled(BootstrapButton)`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 20px;
  width: 100%;

  &:hover {
    background-color: white;
    color: blue;
    border: 2px solid blue;
  }
`;

const GoogleButton = styled(BootstrapButton)`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  color: black;
  border: 2px solid lightgray;
  font-size: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: lightgray;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const id = uid();
  const [password, setPassword] = useState("");
  const { signUp, googleSignIn } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, name, value, id);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await googleSignIn();
      toast.success("Google Sign-In successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <div className="p-4 box shadow-sm bg-white rounded">
            <h2 className="mb-3 text-center">Create your account</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formbBasicText">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <PhoneInput
                  defaultCountry="IN"
                  className="form-control"
                  id="number"
                  placeholder="Enter phone number"
                  value={value}
                  onChange={setValue}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit">Sign up</Button>
              </div>
            </Form>
            <div className="d-grid gap-2 mt-3">
              <GoogleButton onClick={handleGoogleSignIn}>
                <FcGoogle size={24} className="mr-2" />
                Sign up with Google
              </GoogleButton>
            </div>
            <div className="p-4 box mt-3 text-center">
              Already have an account? <Link to="/">Log In</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
