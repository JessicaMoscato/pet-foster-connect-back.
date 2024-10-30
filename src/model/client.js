import  Sequelize  from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
    { dialect: 'postgres' }
)

await sequelize.authenticate();

export default sequelize;