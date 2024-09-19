import {Request,Response,NextFunction} from 'express'
const verifyRoles = (...allowedRoles:number[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        if (!(req as any)?.roles) return res.sendStatus(401);

        const rolesArray = [...allowedRoles];

        console.log(rolesArray);
        console.log((req as any).roles);

        // Check if the user's roles match the roles required to access a route
        const result = (req as any).roles
            .map((role: number) => rolesArray.includes(role))
            .find((value: boolean) => value === true);
            

        // If no matching roles are found, send a 401 Unauthorized response
        if (!result) {
            return res.sendStatus(401);
        }

        next();
    };
};

export default verifyRoles;
