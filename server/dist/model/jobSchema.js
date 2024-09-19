"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgreSql_1 = __importDefault(require("../config/postgreSql"));
const companySchema_1 = __importDefault(require("../model/companySchema"));
const sequelize_1 = require("sequelize");
const job = postgreSql_1.default.define('job', {
    jobid: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    companyid: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: companySchema_1.default, // Reference to Job model
            key: 'companyid'
        }
    },
    jobtype: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    jobdescription: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    },
    salary: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    location: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, { timestamps: false, modelName: 'job', tableName: 'job' });
exports.default = job;
