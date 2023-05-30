import * as sql from 'mssql'; 
import { DB_NAME, DB_USER, DB_PASSWORD, DB_SERVER } from '$env/static/private';

const settings: sql.config = {
    user: DB_USER,
    password: DB_PASSWORD,
    server: DB_SERVER,
    database: DB_NAME,
    options: {
        encrypt: false
    }
}

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        let poolConnection = await sql.connect(settings);
        let resultSet = await poolConnection.request().query(`SELECT * FROM dbo.tblFCollectors WHERE ID = 1`);
        console.log(resultSet);


    } catch (err: any) {
        console.error(err.message);
    }
}