"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgreSql_1 = __importDefault(require("../config/postgreSql")); // your Sequelize instance
const company = postgreSql_1.default.define('Company', {
    companyid: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    },
    contactphone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    contactemail: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    }
}, { timestamps: false, modelName: 'company', tableName: 'company' });
exports.default = company;
