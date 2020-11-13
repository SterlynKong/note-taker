const express = require('express');


// create instance of app and declare port
const app = express();
const PORT = process.env.PORT || 3001



// start app instance on declared port
app.listen(PORT, () => console.log('Listening on port:' + PORT));