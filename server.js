const express = require('express');
 require('dotenv').config();
//  const bodyParser = require('body-parser')
const cookie = require('cookie-parser');
const connection = require('./src/db/Conn');
const router = require('./src/routes/Voter.routes');
const cors = require('cors')


const app = express()

const port = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookie());

const corsOptions = {
    origin: "https://voting-app-front-end.vercel.app",
    credentials : true
}

app.use(cors(corsOptions))
// app.use(bodyParser);

connection();

app.use('/voter',router)

app.listen(port, () => {
    console.log(`Server started on ${port} port`);
}); 