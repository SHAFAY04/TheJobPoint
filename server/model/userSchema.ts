import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/postgreSql'; // your Sequelize instance
import { inherits } from 'util';

const users=sequelize.define ('users',{
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  refreshtoken: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  roles: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: { "User": 2024 } // Default JSON value for roles
  }
},{
  timestamps:false
});

export default users;
