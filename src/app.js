import '../config.js';
import express from 'express';
import router from './router.js';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();

const PORT = process.env.PORT || process.env.PORT_DEFAULT;

const __filename = new URL(import.meta.url).pathname; // Obtém o caminho do arquivo atual a partir do import.meta.url
const __dirname = path.dirname(__filename); // Usa path.dirname() para obter o diretório do arquivo atual

const staticFileDirectory = path.join(__dirname, 'public');
app.use(express.static(staticFileDirectory));

app.use(router);

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('pages/login');
});

app.listen(PORT, () => console.log(`> Server running http://localhost:${PORT}`));