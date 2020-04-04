import firebase from 'firebase';
import 'firebase/storage'

// var firebaseConfig = {
//     apiKey: "AIzaSyCotKPNQcLXD2dyAcp9szaA6wllKa_LvTE",
//     authDomain: "attractionsalon-b7284.firebaseapp.com",
//     databaseURL: "https://attractionsalon-b7284.firebaseio.com",
//     projectId: "attractionsalon-b7284",
//     storageBucket: "attractionsalon-b7284.appspot.com",
//     messagingSenderId: "405878586719",
//     appId: "1:405878586719:web:f114fe673653beef094aea",
//     measurementId: "G-LFBWHE7QRX"
//   };

  var firebaseConfig = {
    apiKey: "AIzaSyBPaSTq69hgw8VBWIlRshDwOPSTfEp2hBw",
    authDomain: "attractionsalon-97d1f.firebaseapp.com",
    databaseURL: "https://attractionsalon-97d1f.firebaseio.com",
    projectId: "attractionsalon-97d1f",
    storageBucket: "attractionsalon-97d1f.appspot.com",
    messagingSenderId: "495191992726",
    appId: "1:495191992726:web:a0e28ef6818df7143a95b7",
    measurementId: "G-K52NE2LBXF"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const db = firebase.database();

  export {db, storage, fire as default };