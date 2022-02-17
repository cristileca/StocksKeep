import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Card,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { get, getDatabase, ref, set } from "firebase/database";
import { auth } from "../firebase";

export default function DashBoard() {
  const { error, setError } = useState();
  const { currentUser, logout } = useAuth();
  const history = useNavigate();
  const userNameRef = useRef();
  const db = getDatabase();
  let [uid, setUid] = useState();
  let [username, setUsername] = useState();
  let [email, setEmail] = useState();

  useEffect(() => {
    if (auth.currentUser) {
      setUid(auth.currentUser.uid);
      setEmail(auth.currentUser.email);

      get(ref(db, `users/${uid}/username`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val());

            console.log(username);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    }
  }, [auth]);

  async function writeUserData(userId, name) {
    await set(ref(db, "users/" + userId), {
      username: name,
    });
  }

  get(ref(db, `users/${uid}/username`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setUsername(snapshot.val());
        console.log(username);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  async function handleLogOut() {
    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div>
        <Navbar className="shadow p-3 mb-0.5  rounded" bg="dark" variant="dark">
          <Container>
            <Link to="/" className="navbar-brand">
              Centyso
            </Link>
            <Nav className="me-auto w-400px">
              <Link to="/stocks" className="nav-link ">
                Stocks
              </Link>
            </Nav>
            <strong style={{ color: "ivory" }}>{email}</strong>
          </Container>
        </Navbar>
        <Card className="w-100 shadow p-3 mb-0.5  rounded">
          <Card.Body>
            <h1 className="text-center mb-4 ">Profile</h1>
            <strong>Username: {username} </strong>

            <Form.Control
              className="mt-3 w-100"
              size="m"
              type="text"
              ref={userNameRef}
              placeholder="Set User Name"
            />
            <Button
              className="w-100 mt-3"
              type="submit"
              onClick={() => writeUserData(uid, userNameRef.current.value)}
            >
              Set Username
            </Button>
            <Form>{error && <Alert variant="danger">{error}</Alert>}</Form>
          </Card.Body>

          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogOut}>
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
