import dotenv from 'dotenv';
dotenv.config();

const config = {
    development: {
        url: process.env.DB_URL_DEV,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        url: process.env.DB_URL_TEST,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        url: process.env.DB_URL_PROD,
        dialect: process.env.DB_DIALECT,
    },
};

export default config;
module.exports = config;
