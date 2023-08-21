const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const ip = require('ip');
const cors = require('cors');
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const { check, validationResult } = require('express-validator');
const e = require('express');

const ipA = ip.address();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



// app.get('/profile', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'main', 'profile.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/alluser', async (req, res) => {
  const endpoint = `http://${ipA}:5000/admin`;

  try {
    // Lakukan permintaan GET ke endpoint menggunakan Axios
    const response = await axios.get(endpoint);

    const data = response.data.infoUsers;

    // Render template EJS dan kirimkan data sebagai variabel
    res.render(path.join(__dirname, 'public', 'getalluser', 'index.ejs'), { users: data });
  } catch (error) {
    console.error(error);
    const msg = error.response.data.msg || "Terjadi kesalahan saat mengambil data profil.";
    res.render(path.join(__dirname, 'public', 'pesan', 'pesan.ejs'), { msg: msg });
  }

});

app.get('/me', async (req, res) => {
  const endpoint = `http://${ipA}:5000/me`;
  try {
    const response = await axios.get(endpoint, { withCredentials: true });
    const data = response.data.infoUser;
    const msg = response.data.msg;
    const url = '/signupform/';

    if (response.status === 200) {
      res.render(path.join(__dirname, 'public', 'profile', 'index.ejs'), { users: data}); // Mengirim data sesi ke template
    } else {
      console.log(msg);
      res.render(path.join(__dirname, 'public', 'pesan', 'pesan.ejs'), { msg: msg, url: url });
    }
  } catch (error) {
    console.error(error);
    const url = '/signupform/';
    const msg = error.response.data.msg || "Terjadi kesalahan saat mengambil data profil.";
    res.render(path.join(__dirname, 'public', 'pesan', 'pesan.ejs'), { msg: msg, url:url });
  }
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const login = `http://${ipA}:5000/login`;
  const data = {
    email: email,
    password: password,
  }
  const urlerror = '/signupform/';
  const urlsuccess = '/profile/';
  try {
    const response = await axios.post(login, data);
    const msg = await response.data.msg;
    
    if (await response.status == 200) {
      res.redirect('/me/');
    } else {
      res.render(path.join(__dirname, 'public', 'pesan', 'pesan.ejs'), { msg: msg, url: urlerror });
    }
  } catch (error) {
    const msg = await response.data.msg;
    res.render(path.join(__dirname, 'public', 'pesan', 'pesan.ejs'), { msg: msg, url: urlerror });
  }
});


app.post('/signupform', [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  const regis = `http://${ipA}:5000/register`;

  const data = {
    name: username,
    email: email,
    password: password,
    veryPassword: password,
  }

  try {
  const response = await axios.post(regis, data);
    
    const msg = await response.data.msg;

    const url = `/signupform/`;
    if (response) {
      console.log(msg);
      // res.redirect('/singupform/', {msg: msg})
      res.render(path.join(__dirname, 'public', 'pesan', 'pesan.ejs'), { msg: msg, url: url });
    }
    
    // pesan(msg)
  } catch (error) {
    // Handle error if needed
    console.error(error);
    const msg = error.response.data.msg || "Terjadi kesalahan saat mengambil data profil.";
    const url = `/signupform/`;
    res.render(path.join(__dirname, 'public', 'pesan', 'pesan.ejs'), { msg: msg, url:url });
}
});

app.listen(port, () => {
  console.log(`Server berjalan di http://${ipA}:${port}`);
});
