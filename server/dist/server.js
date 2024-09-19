"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const root_1 = __importDefault(require("./routes/root"));
const subdir_1 = __importDefault(require("./routes/subdir"));
const logEvents_1 = require("./middleware/logEvents");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const jobsRoute_1 = __importDefault(require("./routes/jobsRoute"));
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const logout_1 = __importDefault(require("./routes/logout"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
app.use(logEvents_1.logger);
// Handle options credentials check before CORS; this middleware checks if the request origin is allowed and sets the Allow credentials to true so cookies can be fetched in the frontend
app.use(credentials_1.default);
// Cross-Origin Resource Sharing
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
//this gives you access to req.body and we can get json data
app.use(express_1.default.json());
// Middleware for cookies
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use('/about', express_1.default.static(path.join(__dirname, 'public')));
app.use('/', root_1.default);
app.use('/about', subdir_1.default);
app.use('/register', register_1.default);
app.use('/auth', auth_1.default);
app.use('/refresh', refresh_1.default);
app.use('/logout', logout_1.default);
// Authentication middleware for routes after this point
app.use(verifyJWT_1.default);
app.use('/jobs', jobsRoute_1.default);
app.get('^/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
// Handle CORS errors with the error handler middleware
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`SERVER IS UP AT ${PORT}!`);
});
