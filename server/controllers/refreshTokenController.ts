export {}; // Add this to prevent issues with block-scoped variables

    import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import users from '../model/userSchema';
import { Op } from 'sequelize';

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    // Checking if we have cookies and if they have the jwt property or not
    if (!cookies?.jwt) {
        // Unauthorized
        console.log('no cookies');
        return res.sendStatus(401);
    }

    const refreshtoken = cookies.jwt;
 
    const foundUser = await users.findOne({where:
        {
            refreshtoken:{
                [Op.eq]:refreshtoken
            }
        }
    })
    const refr=foundUser?.getDataValue('refreshtoken')
    const foundUserroles=foundUser?.getDataValue('roles')
    const name=foundUser?.getDataValue('username')

    if (!refr) {
        // Forbidden!
        return res.sendStatus(403);
    } 

    const access = process.env.ACCESS_TOKEN_SECRET as string;
    const refresh = process.env.REFRESH_TOKEN_SECRET as string;

    const roles = Object.values(foundUserroles);

    jwt.verify(refreshtoken, refresh, (err, decoded) => {
        if (err || name !== decoded.username!) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { "UserInfo": { "username": decoded.username, "roles": roles } },
            access,
            { expiresIn: '30s' }
        );

        res.json({ accessToken });
    });
};

module.exports = handleRefreshToken;
