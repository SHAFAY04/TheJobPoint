//one reason that require will never run on the browser is that it uses tcp while the browser runs on http and tcp is like very low level and http runs on top of tcp

import * as dotenv from 'dotenv';
dotenv.config()


import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false, // Disable SSL for development environments
  },
});

 export default sequelize
  