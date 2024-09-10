import whitelist from './allowedOrigins.js';
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Origin not Allowed!'));
        }
    },
    optionsSuccessStatus: 200
};
export default corsOptions;
//# sourceMappingURL=corsOptions.js.map