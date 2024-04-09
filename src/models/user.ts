'use strict';

import { Model, DataTypes } from "sequelize";
import sequelize from ".";
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

interface UserAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role?: string;
    resetPasswordToken?: string | null,
    resetPasswordExpires?: Date | null,
    createdAt?: Date,
    updatedAt?: Date,
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public role!: string;
    public resetPasswordToken?: string | null;
    public resetPasswordExpires?: Date | null;
    public createdAt?: Date;
    public updatedAt?: Date;
}

User.init({
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
}, {
    sequelize: sequelize!,
    modelName: 'user',
    tableName: 'users',
});

export default User;
