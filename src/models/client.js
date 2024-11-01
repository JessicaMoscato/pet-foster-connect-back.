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

// !Vérification de l'affichage des variables d'environnement pour le débogage
console.log(`Connecting to database: ${database} at ${host}:${port}`);

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`, {
    dialect: 'postgres',
    logging: false,
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at', 
    }
});

// !Authentification avec la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log(`🚀 Database ${database} connected`);
  })
  .catch((err) => {
    console.error(`❌ Unable to connect to database ${database}:`, err.message);
    console.error("Details:", err);
  });

export default sequelize;
