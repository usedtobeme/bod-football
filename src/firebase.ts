import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import config from "./firebase.config";

const fb = firebase.initializeApp(config);

export default fb;
