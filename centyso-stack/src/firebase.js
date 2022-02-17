import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAOoGEBXAbPwTnRpyFmSOb4TNTJ_jjYU-g",
  authDomain: "centyso-stack.firebaseapp.com",
  databaseURL: "https://centyso-stack-default-rtdb.firebaseio.com",
  projectId: "centyso-stack",
  storageBucket: "centyso-stack.appspot.com",
  messagingSenderId: "697491478467",
  appId: "1:697491478467:web:b51bf889349edc5d39cf76",
  measurementId: "G-HX6XTHRKSC",
});

export const auth = app.auth();
export default app;
