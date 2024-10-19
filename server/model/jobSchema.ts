
import sequelize from '../config/postgreSql';
import Company from '../model/companySchema'
import { DataTypes } from 'sequelize';

const job = sequelize.define('job', {
  employer:{
    type:DataTypes.STRING(50),
    allowNull:false,
  },
  jobid: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  companyid: {
    type: DataTypes.STRING(10),
    allowNull: false,
    references: {
      model: Company,  // Reference to Job model
      key: 'companyid'
    }
  },
  jobtype: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  jobdescription: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  salary: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
},{timestamps:false,modelName:'job',  tableName: 'job'});

export default job;
