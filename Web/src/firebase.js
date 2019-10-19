import  firebase from 'firebase/app'

import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAVdNzNEe9NvU4EJZs8TkOiYQLoIE6FNN8",
  authDomain: "blockhack-3fab1.firebaseapp.com",
  databaseURL: "https://blockhack-3fab1.firebaseio.com",
  projectId: "blockhack-3fab1",
  storageBucket: "blockhack-3fab1.appspot.com",
  messagingSenderId: "549050459301",
  appId: "1:549050459301:web:5900d474877b13db31d94c",
  measurementId: "G-M1ZB1D6WV4"
};

  firebase.initializeApp(firebaseConfig);

  const firebaseDatabase = firebase.database();

  export  {
       firebase,
       firebaseDatabase
  }