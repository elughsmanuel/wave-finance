'use strict';

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";
import { 
    FIRST_NAME_REQUIRED,
    LAST_NAME_REQUIRED,
    EMAIL_REQUIRED,
    USERNAME_REQUIRED,
    PASSWORD_REQUIRED,
    UNIQUE_EMAIL,
    UNIQUE_USERNAME,
    UNIQUE_EMAIL_CODE,
    UNIQUE_USERNAME_CODE,
    USER,
    ADMIN,
} from "../auth/utils/constants";

module.exports = {
    async up (queryInterface: QueryInterface) {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: FIRST_NAME_REQUIRED,
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: LAST_NAME_REQUIRED,
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: UNIQUE_EMAIL_CODE,
                    msg: UNIQUE_EMAIL,
                },
                validate: {
                    notEmpty: {
                        msg: EMAIL_REQUIRED,
                    },
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: UNIQUE_USERNAME_CODE,
                    msg: UNIQUE_USERNAME,
                },
                validate: {
                    notEmpty: {
                        msg: USERNAME_REQUIRED,
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: PASSWORD_REQUIRED,
                    },
                },
            },
            role: {
                type: DataTypes.ENUM(USER, ADMIN),
                allowNull: false,
                defaultValue: USER,
            },
            resetPasswordToken: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            resetPasswordExpires: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        });
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.dropTable('users');
    },
};
