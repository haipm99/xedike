/* 3rd packages*/
const express = require('express');
const mongoose = require('mongoose');
/* project packages */


/*connect database */
mongoose.connect('mongodb://localhost:27017/fs03-xedike',{useNewUrlParser: true})
.then(console.log("connect to DB Success !"))
.catch(console.log)
/* initialize project */
const app = express();
/*middlewares*/

//parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/users',require('./routes/api/user'))
const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`listen on port ${port}`)
});