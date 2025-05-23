import { Pool } from 'pg'; //Importação da biblioteca do postrgres para interagir com o node.js

require("dotenv").config(); //  Carrega as variaveis de ambiente a partir do arquivo dotenv para usar no meu codigo.

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
})
//Estou criando uma nova instância da classe Pool e configurando ela com as variavies de ambiente. Assim estabelecendo uma conexão com o meu banco.

export default pool; //Exportando essa função para ser usado gobal no meu codigo.