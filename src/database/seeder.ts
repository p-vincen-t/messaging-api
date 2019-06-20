import fs from 'fs';
import { Sequelize } from 'sequelize-typescript';
import chalk from 'chalk';


const runSeeds = (db: Sequelize , tables: string[]) =>{
    const seedingQueries = tables.map((tableName)=>{
        return db.query(fs.readFileSync(__dirname+'/tables/'+tableName+".sql", {encoding: "UTF-8"}))
    });
    return seedingQueries;
}

const seed = (db: Sequelize, tables: string[])=> {
    Promise.all(runSeeds(db, tables)).then(()=>{
        console.log(chalk.green('Database seeding successful'))
    }).catch(()=>{
        console.log(chalk.red('Database seeding failed'))
    })
}

export default seed;