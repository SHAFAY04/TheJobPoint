import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

const users = JSON.parse(await fs.promises.readFile(new URL('../model/users.json', import.meta.url)));
const handleAuth = async (req, res) => {
    let cookie = req.cookies;
    if (cookie.jwt)
        return res.status(409).send({ message: 'Another User Already Logged In!' });
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password are required!' });
        }
        let user = users.find((person) => person.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Username or Password!' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid Username or Password!' });
        }
        const access = process.env.ACCESS_TOKEN_SECRET;
        const refresh = process.env.REFRESH_TOKEN_SECRET;
        const roles = Object.values(user.roles);
        // Create JWTs
        //The user logs in with their credentials.
        //The server issues both an access token (for immediate use) and a refresh token (to keep the session alive).The access token is used for requests to protected routes.
        //When the access token expires, the client automatically sends a request to the /refresh route using the refresh token.Once the refresh token expires, the user will be required to log in again to obtain new tokens.
        const accessToken = jwt.sign({ "UserInfo": { "username": user.username, "roles": roles } }, access, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ "username": user.username }, refresh, { expiresIn: '1d' });
        // Save the refresh token with the user
        let otherUsers = users.filter((person) => person.username !== user.username);
        const currentUser = { ...user, refreshToken };
        users = [...otherUsers, currentUser];
        // Set the refresh token as an HttpOnly cookie
        //also you will need secure true when working with google or in production but when working with postman or thunderclient you shouldnt have it When your app is hosted on a server with HTTPS (as it should be), secure: true ensures that the cookie containing the refresh token is only sent over encrypted HTTPS connections, thus protecting it from being transmitted over insecure HTTP connections.In Development (Thunder Client): Tools like Thunder Client, Postman, or local development servers often use http://localhost, which is not HTTPS. If secure: true is set while working on http://localhost, the cookie will not be sent because it only allows the cookie to be transmitted over HTTPS.
        //sameSite: 'None': This is used when cross-origin requests need to carry cookies, such as with third-party OAuth services (like Google).
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        // Send the access token to the client
        res.json({ accessToken });
        // Write the updated users array to the file
        const filePath = path.join(__dirname, '..', 'model', 'user.json');
        console.log('Writing to file:', filePath);
        const backupPath = `${filePath}.backup`;
        await fs.promises.copyFile(filePath, backupPath);
        const tempFilePath = `${filePath}.tmp`;
        await fs.promises.writeFile(tempFilePath, JSON.stringify(users));
        await fs.promises.rename(tempFilePath, filePath);
        console.log('File write successful.');
    }
    catch (error) {
        console.error('Error in handleAuth:', error);
        // Restore from backup if file write failed
        const filePath = path.join(__dirname, '..', 'model', 'user.json');
        const backupPath = `${filePath}.backup`;
        if (fs.existsSync(backupPath)) {
            await fs.promises.copyFile(backupPath, filePath);
            console.log('Restored user.json from backup.');
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export default handleAuth;
//# sourceMappingURL=authController.js.map