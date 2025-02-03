import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";


export const DB_INFOS: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 14369
}


