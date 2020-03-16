import firebase from 'firebase';
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCotKPNQcLXD2dyAcp9szaA6wllKa_LvTE",
    authDomain: "attractionsalon-b7284.firebaseapp.com",
    databaseURL: "https://attractionsalon-b7284.firebaseio.com",
    projectId: "attractionsalon-b7284",
    storageBucket: "attractionsalon-b7284.appspot.com",
    messagingSenderId: "405878586719",
    appId: "1:405878586719:web:f114fe673653beef094aea",
    measurementId: "G-LFBWHE7QRX"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, fire as default };