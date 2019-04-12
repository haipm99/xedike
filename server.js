/* 3rd packages*/
const express = require('express')

/* project packages */


/* initialize project */

const app = express();
const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`listen on port ${port}`)
})