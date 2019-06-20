export default ({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE_PATH,
    port: Number(process.env.DB_PORT),
})