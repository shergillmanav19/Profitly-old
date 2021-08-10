import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, Redirect } from "react-router-dom";
import { useSavedSessionState } from "../redux/hooks/useSavedSessionState";

export default function Signup() {
  const { loggedIn, setLoggedIn } = useSavedSessionState();
  const { setUsername } = useSavedSessionState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      setUsername(usernameRef);
      const signedUp = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (signedUp) {
        setLoggedIn(true);
        setLoading(false);
      } else {
        console.log("Sign Up not successful");
      }
    } catch {
      setError("Sorry, we failed to create an account");
    }
  }

  return (
    <>
      <Card>
        {loggedIn === "true" ? <Redirect to="/main" /> : " "}
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control ref={usernameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link style={{ color: "#0C5ED7" }} to="/login">
          Log In
        </Link>
      </div>
    </>
  );
}
