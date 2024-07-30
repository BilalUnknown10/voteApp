const express = require('express');
 require('dotenv').config();
//  const bodyParser = require('body-parser')
const cookie = require('cookie-parser');
const connection = require('./db/Conn');
const router = require('./routes/voterRoutes/Voter.routes')


const app = express()

const port = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookie());
// app.use(bodyParser);

connection();

app.use('/voter',router)

app.listen(port, () => {
    console.log(`Server started on ${port} port`);
}); 