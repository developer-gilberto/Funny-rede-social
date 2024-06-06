import '../config.js';
import express from 'express';

const app = express();

const PORT = process.env.PORT || process.env.PORT_DEFAULT;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => console.log(`> Server running http://localhost:${PORT}`));