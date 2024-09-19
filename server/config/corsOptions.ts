export{}

import whitelist from './allowedOrigins';

type corsCallback=(err:Error|null,allow?:boolean)=>void

const corsOptions = {
    origin: (origin:string|undefined, callback:corsCallback) => {
        if ((origin && whitelist.indexOf(origin) !== -1) || !origin) {
            callback(null, true);
        } else {  
            callback(new Error(`Origin not Allowed!: ${origin}`));
        }
    },
    optionsSuccessStatus: 200 as number
};

export default corsOptions;
