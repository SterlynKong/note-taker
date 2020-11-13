// require dependency - express
const express = require('express');
// require dependency - html routes
const htmlRoutes = require('./routes/htmlRoutes/index');
// require dependency - api routes
const apiRoutes = require('./routes/apiRoutes/apiRoutes');


// create instance of app and declare port
const app = express();
const PORT = process.env.PORT || 3001;


// declare middleware required for parsing incoming Request Object as a JSON Object
app.use(express.json());
// decalre middleware required for recognizing incoming Request Object as and Array or String
app.use(express.urlencoded({ extended: true}));
// serve static files
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start app instance on declared port
app.listen(PORT, () => console.log('Listening on PORT:' + PORT));