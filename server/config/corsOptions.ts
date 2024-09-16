export{}

const whitelist = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Origin not allowed:', origin);    
            callback(new Error(`Origin not Allowed!: ${origin}`));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
