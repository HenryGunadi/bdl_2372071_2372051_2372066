import sql from 'mssql'

export var config: sql.config = {
    user: '',
    password: '',
    server: 'localhost',
    database: "testing",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}