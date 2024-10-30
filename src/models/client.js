import { Sequelize } from "sequelize";
import "dotenv/config";

const {
    POSTGRES_USER: user,
    POSTGRES_PASSWORD: password,
    POSTGRES_DB: database,
    DB_HOST: host,
    POSTGRES_PORT: port,
} = process.env;

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`,{
    dialect: 'postgres',
    logging: false,
    define: {
        createdAt: 'created_at',
        updatedAt: 'update_at',
    }
})

sequelize.authenticate()
    .then(
        () => console.log(`🚀 database ${database} connected`),
        () => console.log(`❌ unable to connect to database ${database}`)
    );

export default sequelize;