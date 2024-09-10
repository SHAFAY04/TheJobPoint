import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs'
const users = JSON.parse(await fs.promises.readFile(new URL('../model/users.json', import.meta.url)));
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //checking if we have cookies and if we have them then do they have the jwt property or not
    if (!cookies?.jwt) {
        //Unauthorized
        console.log('no cookies');
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    let foundUser = users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) {
        //forbidden!
        return res.sendStatus(403);
    }
    const access = process.env.ACCESS_TOKEN_SECRET;
    const refresh = process.env.REFRESH_TOKEN_SECRET;
    const roles = Object.values(foundUser.roles);
    jwt.verify(refreshToken, refresh, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ "UserInfo": { "username": decoded.username, "roles": roles } }, access, { expiresIn: '30s' });
        res.json({ accessToken });
    });
};
export default handleRefreshToken;
//# sourceMappingURL=refreshTokenController.js.map