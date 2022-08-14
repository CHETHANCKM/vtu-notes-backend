import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import { initializeApp } from 'firebase/app';
import express from 'express';

const server = express();

const port= 8080;

const firebaseConfig = {
    apiKey: "AIzaSyDXzE5gbmHTZf6IMYv7jC7_mBBHfcb_bPY",
    authDomain: "vtu-notes-dev.firebaseapp.com",
    projectId: "vtu-notes-dev",
    storageBucket: "vtu-notes-dev.appspot.com",
    messagingSenderId: "130293644333",
    appId: "1:130293644333:web:1e99e0fee263a4a7f00ca4",
    measurementId: "G-TKLC12J3NZ"
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res)=>{
    res.send("<!DOCTYPE html><html><body><h1>Hello World!</h1></body></html>")
    });

server.get('/signup', (req, res)=>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  var fullName = req.query.fullName.toUpperCase();
  var email = req.query.email.toLowerCase();
  var usn = req.query.usn.toUpperCase();
  var branch = req.query.branch;
  var college = req.query.college;

  writeUserData(fullName, email, usn, branch, college);

  function writeUserData(fullName, email, usn, branch, college) {
      const db = getDatabase();
      set(ref(db, 'users/' + usn), {
        fullName: fullName,
        email: email,
        usn : usn,
        branch: branch,
        college: college
      }).then((data)=>{
          res.status(200).send("Success");
      });
      }
});

server.get('/addSubject', (req, res)=>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  var branch = req.query.branch.toUpperCase();
  var semester = req.query.semester.toLowerCase();
  var subCode = req.query.subCode.toUpperCase();
  var subName = req.query.subName.toUpperCase();


  writeUserData(branch, semester, subCode, subName);

  function writeUserData(branch, semester, subCode, subName) {
      const db = getDatabase();
      set(ref(db, 'subjects/'+branch+'/'+semester+'/'), {
        subjectCode: subCode,
        subjectName : subName
      }).then((data)=>{
          res.status(200).send("Success");
      });
      }
});

server.get('/getAllScheme', (req, res)=>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  const dbRef = ref(getDatabase());

  get(child(dbRef, 'scheme')).then((snapshot) => {
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      res.send("No schemes found");
    }
  }).catch((error) => {
    console.error(error);
  });
});

server.get('/getAllModule', (req, res)=>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  const dbRef = ref(getDatabase());

  get(child(dbRef, 'module')).then((snapshot) => {
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      res.send("No module found");
    }
  }).catch((error) => {
    console.error(error);
  });
});


server.get('/getAllSubject', (req, res)=>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  const dbRef = ref(getDatabase());

  get(child(dbRef, 'subject')).then((snapshot) => {
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      res.send("No subject found");
    }
  }).catch((error) => {
    console.error(error);
  });
});

server.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running at ${port}`)
});