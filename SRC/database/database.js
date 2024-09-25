import pg from 'pg'
import {DB_HOST_PG2,DB_USER_PG2,DB_PASSWORD_PG2,DB_DB_PG2,DB_PORT_PG2} from '../config.js'

export const pool = new pg.Pool({
    host:DB_HOST_PG2,
    user:DB_USER_PG2,
    password:DB_PASSWORD_PG2,
    database:DB_DB_PG2,
    port: DB_PORT_PG2
})

/*probar conexion*/
/*
pool.query('select now()').then(result => {
    console.log(result.rows)
})
    */