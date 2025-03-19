import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

database.$connect()
    .then(() => {
        console.log(`→ Prisma has connected to the database...`);
    })
    .catch((error) => {
        console.error(`× Failure on database connection...`)
    })

export default database;