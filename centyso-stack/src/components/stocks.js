import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Card,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { auth } from "../firebase";

export default function Stocks() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const db = getDatabase();
  let [stock, setStock] = useState();
  let [prod, setProd] = useState();
  let stocksRef = useRef();
  let productRef = useRef();
  let [username, setUsername] = useState();
  let [uid, setUid] = useState();
  let [email, setEmail] = useState();

  useEffect(() => {
    if (auth.currentUser) {
      setUid(auth.currentUser.uid);
      setEmail(auth.currentUser.email);
      stocks();
    }
  }, [auth]);

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

  async function writeStock(product, quantity) {
    setError("");
    if (product != "") {
      console.log(product);
      await set(ref(db, `users/stock/${product}`), quantity).then(() => {
        stocks();
      });
    } else {
      let errMsg = "No product added";
      setError(errMsg);
    }
  }

  async function remProd(product) {
    setError("");
    if (product != "") {
      await remove(ref(db, `users/stock/${product}`)).then((response) => {
        console.log(response);
      });
    } else {
      setError("No product selected!");
    }
  }

  async function mapp(stockm) {
    let obj = Object.entries(stockm);
    let count = obj.map((element) => (
      <Table striped bordered hover size="sm">
        <tbody>
          <tr style={{ backgroundColor: "#4B0082" }}>
            <td
              style={{
                borderColor: "#fff",

                alignSelf: "center",
                backgroundColor: "#000099",
                width: "30% ",
                textAlign: "center",
                color: "#FFFAF0",
              }}
            >
              {element[0]}
            </td>
            <td
              style={{
                borderColor: "#fff",

                alignSelf: "center",
                backgroundColor: "#000099",
                width: "50% ",
                textAlign: "center",
                color: "#FFFAF0",
              }}
            >
              {" "}
              {element[1]}
            </td>
          </tr>
        </tbody>
      </Table>
    ));
    setProd(count);
    console.log(count);
  }

  async function stocks() {
    get(ref(db, `users/stock/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStock(snapshot.val());

          mapp(stock);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="shadow p-3 mb-0.5  rounded">
        <Container>
          <Link to="/" className="navbar-brand">
            Centyso
          </Link>
          <Nav className="me-auto w-400px">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </Nav>
          <strong style={{ color: "white" }}>{username}</strong>
        </Container>
      </Navbar>
      <Card className="shadow p-3 mb-2 bg-white rounded">
        <Card.Body>
          <h1 className="text-center mb-4 ">Stocks</h1>
          {error && (
            <Form
              variant="danger"
              style={{
                height: 24,
                width: "content-size",
                alignSelf: "center",
                textAlign: "center",
                background: "#920",
                borderRadius: "8px",
                alignContent: "center",
                color: "#ffffff",
                border: "4px ",
                borderColor: "#920",
              }}
            >
              {error}
            </Form>
          )}
          <Form.Control
            style={{
              borderRadius: "15px",
              alignSelf: "center",
            }}
            className="mt-3 w-100 "
            size="m"
            type="text"
            ref={productRef}
            placeholder="Product"
          />
          <Form.Control
            style={{
              borderRadius: "15px",
              alignSelf: "center",
            }}
            className="mt-3 w-100"
            size="m"
            type="text"
            ref={stocksRef}
            placeholder="Stock count"
          />
          <Button
            style={{
              borderColor: "#fff",
              borderRadius: "25px",
              alignSelf: "center",
              backgroundColor: "#0099cc",
            }}
            className="w-25% mt-3  "
            type="submit"
            onClick={() => {
              writeStock(productRef.current.value, stocksRef.current.value);
            }}
          >
            Update stock
          </Button>
          <Button
            style={{
              borderRadius: "25px",
              borderColor: "#fff",
              alignSelf: "center",
              backgroundColor: "#00b32d",
            }}
            className="w-25% m-3"
            type="submit"
            onClick={() => stocks()}
          >
            Check stock
          </Button>
          <Button
            style={{
              borderColor: "#fff",
              borderRadius: "25px",
              alignSelf: "center",
              backgroundColor: " #ff6633",
            }}
            className="w-25% mt-3  "
            type="submit"
            onClick={() => {
              remProd(productRef.current.value);
              stocks();
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
      <Card className="mt-1 shadow p-3 mb-5 bg-white rounded ">
        <Card.Body>{prod}</Card.Body>
      </Card>
    </div>
  );
}
