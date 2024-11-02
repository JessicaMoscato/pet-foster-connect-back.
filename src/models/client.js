import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const {
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: database,
  DB_HOST: host,
  POSTGRES_PORT: port,
  NODE_ENV: env,
} = process.env;



const sequelize = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${database}`,
  {
    dialect: "postgres",
    logging: false,
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    dialectModule: pg,
    dialectOptions: {
      ssl:
        env === "production" // Utilisation de 'env' pour vérifier l'environnement
          ? {
              require: true, // Utiliser SSL en production
              rejectUnauthorized: false, // Acceptation des certificats auto-signés
            }
          : false, // Pas de SSL en développement
    },
  }
);

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
