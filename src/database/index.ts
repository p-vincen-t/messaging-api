import { Sequelize } from 'sequelize-typescript';
import dbConfig from 'config/database';
import { User, Client, Message, Group, UserGroup } from 'app/models';
import seed from 'database/seeder';

const db = new Sequelize(dbConfig);

db.addModels([
    UserGroup,
    Group,
    User,
    Client,
    Message
])

export const seedDatabase = async () => {
    seed(db, [ ])
}

export default db;

import {createConnection} from "typeorm";

createConnection({
    type: "mysql",
    host: "localhost",
    username: "username",
    password: "password",
    synchronize: true
}).then(connection => {
    console.log("Connection has been established successfully.");
})
.catch(err => {
    console.error("Unable to connect to the database:", err);
});