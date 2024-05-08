require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/', (req, res) => {
    res.send('Hello, World!!@@@');
});


app.get('/api/text', (req, res) => {
    connection.query('SELECT * FROM texts ORDER BY RAND() LIMIT 1', (error, results) => {
        if (error) throw Error
        res.json({ text: `${results[0].text} by ${results[0].username}` });
    });
});

app.post('/api/text', (req, res) => {
    const { text, username } = req.body;
    const finalText = `${text} ...아마도...`;
    connection.query('INSERT INTO texts SET ?', { text: finalText, username }, (error) => {
        if (error) throw error;
        res.sendStatus(201);
    });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
