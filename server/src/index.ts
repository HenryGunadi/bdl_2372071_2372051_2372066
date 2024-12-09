import {APIServer} from '../src/api/server'
import {DB} from '../src/db/db'
import { config  } from '../src/env/config'

const server = new APIServer("8080")
const db = new DB(config)

const startServer = async () => {
    db.connect()
    server.run()
}

startServer()