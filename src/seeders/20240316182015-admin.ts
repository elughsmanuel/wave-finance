"use strict";
import { QueryInterface } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import bcryptjs from "bcryptjs";
import { ADMIN } from "../auth/utils/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    firstName: process.env.ADMIN_FIRST_NAME,
                    lastName: process.env.ADMIN_LAST_NAME,
                    email: process.env.ADMIN_EMAIL,
                    username: process.env.ADMIN_USERNAME,
                    password: await bcryptjs.hash(
                        `${process.env.ADMIN_PASSWORD}`,
                        Number(process.env.BCRYPT_SALT)
                    ),
                    role: ADMIN,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete("users", {}, {});
    },
};
