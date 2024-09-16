"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles)
            return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        // Check if the user's roles match the roles required to access a route
        const result = req.roles
            .map(role => rolesArray.includes(role))
            .find(value => value === true);
        // If no matching roles are found, send a 401 Unauthorized response
        if (!result) {
            return res.sendStatus(401);
        }
        next();
    };
};
module.exports = verifyRoles;
//# sourceMappingURL=verifyRoles.js.map