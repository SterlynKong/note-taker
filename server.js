const express = require('express');


// create instance of app and declare port
const app = express();
const PORT = process.env.PORT || 3001;


// declare middleware required for parsing incoming Request Object as a JSON Object
app.use(express.json());
// decalre middleware required for recognizing incoming Request Object as and Array or String
app.use(express.urlencoded({ extended: true}));
// serve static files
app.use(express.static('public'));




// start app instance on declared port
app.listen(PORT, () => console.log('Listening on port:' + PORT));