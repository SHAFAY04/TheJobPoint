"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgreSql_1 = __importDefault(require("../config/postgreSql")); // your Sequelize instance
const users = postgreSql_1.default.define('users', {
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    refreshtoken: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    roles: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
        defaultValue: { "User": 2024 } // Default JSON value for roles
    }
}, {
    timestamps: false
});
exports.default = users;
