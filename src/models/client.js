import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

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

sequelize
  .authenticate()
  .then(() => {
    console.log(`🚀 Database ${database} connected`);
  })
  .catch((err) => {
    console.error(`❌ Unable to connect to database ${database}:`, err.message); // Affiche le message d'erreur
    console.error("Details:", err); // Affiche l'objet d'erreur complet
  });

export default sequelize;