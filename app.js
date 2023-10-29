
const port = process.env.PORT || 3000;

const bcrypt = require('bcrypt');

const userRoutes = require('./router/loginUserRoute');
const express = require("express");
const userRoutess = require('./router/forgotPassRoute');
const userRoutesss = require("./router/profileRoute")
const bodyParser = require("body-parser");
const app = express();
const connectToDatabase = require("./db/db");

const register = require('./controller/registerUser')


app.use(bodyParser.json());


app.use('/register', register);
app.use('/login',login)
//app.use('/login', userRoutes);
app.use('/forgotPass', userRoutess);
app.use('/profile', userRoutesss);

app.listen(port, async () => {
  try {
    await connectToDatabase();
    console.log(`Server is running on port ${port}`)
  } catch (err) {
    console.log({ message: "Failed to connect Database", err });
  }
});


