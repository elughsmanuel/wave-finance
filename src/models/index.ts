import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import config from '../config/config';

let sequelize: Sequelize | undefined;

if(config.development) {
    sequelize = new Sequelize(
        process.env.DB_URL_DEV as string,
        {
            dialect: 'mysql',
        }
    );
} else if(config.test) {
    sequelize = new Sequelize(
        process.env.DB_URL_TEST as string,
        {
            dialect: 'mysql',   
        }
    );
} else if(config.production) {
    sequelize = new Sequelize(
        process.env.DB_URL_PROD as string,
        {
            dialect: 'mysql',
        }
    );
}

export default sequelize;
