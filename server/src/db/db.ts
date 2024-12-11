import sql from 'mssql'
import { exit } from 'process';

export class DB {
    private _config: sql.config

    constructor(config: sql.config) {
        this._config = config
    }

    connect(): void {
        // Connect to SQL Server
        sql.connect(this._config, err => {
            if (err) {
                throw err;
            }
            console.log("Connection Successful!");
        });
    }
}