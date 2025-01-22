const express = require('express');
const app = express();

const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodeapp'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

// Criar tabela 'people' se não existir
connection.query(`
    CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
`, (err) => {
    if (err) throw err;
});

// Inserir dados iniciais
const names = ['leandro', 'joao', 'maria', 'jose', 'pedro', 'ana', 'carlos', 'lucas', 'lucia', 'luciano', 'luan'];
names.forEach(name => {
    const sql = `INSERT INTO people(name) values('${name}')`;
    connection.query(sql, (err) => {
        if (err) console.error(err);
    });
});

app.get('/', (req, res) => {
    connection.query(`SELECT * FROM people`, (err, result) => {
        if (err) throw err;

        let response = '<h1>Full Cycle Rocks!</h1><ul>';
        result.forEach(element => {
            response += `<li>${element.name}</li>`;
        });
        response += '</ul>';

        res.send(response);
    });
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});
