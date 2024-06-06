import '../config.js';
import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

const PORT = process.env.PORT || process.env.PORT_DEFAULT;


app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.listen(PORT, () => console.log(`> Server running http://localhost:${PORT}`));