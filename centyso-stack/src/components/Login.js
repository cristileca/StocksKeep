import React, { useRef, useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      login(emailRef.current.value, passwordRef.current.value).then(
        (response) => {
          if (response) {
            console.log("logged in");
          } else {
            console.log("not logged in");
          }
        }
      );
      history("/");
    } catch (err) {
      setError("Failed to sign in !");
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="shadow p-5 mb-0.5  rounded">
        <Card.Body>
          <h1 className="text-center">Centyso</h1>
          <h2 className="text-center mb-4">Log in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log in
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </>
  );
}
