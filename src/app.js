require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const cookieParser = require('cookie-parser');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/db/uploads"));

app.use(router);

const PORT = process.env.PORT || process.env.PORT_DEFAULT;

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('pages/login');
});

app.listen(PORT, () => console.log(`> Server running http://localhost:${PORT}`));