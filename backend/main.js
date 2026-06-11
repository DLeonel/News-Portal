// Importação do módulo mysql2 para conexão com o banco de dados...
const db = require("mysql2");

// Configuração da conexão com o banco de dados...
const connect = db.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "blog_tecnologia",
});

//testando a conexão com o banco de dados...
connect.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    }   else {
        console.log("Conexão bem-sucedida ao banco de dados!");
        connection.release();
    }
});

// Exportação da conexão para ser utilizada em outros arquivos...
module.exports = connect;