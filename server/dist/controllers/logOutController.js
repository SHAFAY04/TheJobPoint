import * as fs from 'fs';
import * as path from 'path';
const users = JSON.parse(await fs.promises.readFile(new URL('../model/users.json', import.meta.url)));
const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    //checking if we have cookies and if we have them then do they have the jwt property or not
    if (!cookies?.jwt) {
        //Unauthorized
        console.log('no one loggedIn!');
        return res.sendStatus(204); //No Content to send
    }
    const refreshToken = cookies.jwt;
    //is refresh token in DB/user.json?
    let foundUser = users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204); //succesfull but no content to send
    }
    const otherUsers = users.filter((person) => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: undefined };
    users = [...otherUsers, currentUser];
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //secure:true; this option only serves on https that we will use in production we are currently in development
    res.sendStatus(204);
    try {
        await fs.promises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(users));
        console.log('wrote to file');
    }
    catch (error) {
        console.log(error);
    }
};
export default handleLogout;
//# sourceMappingURL=logOutController.js.map