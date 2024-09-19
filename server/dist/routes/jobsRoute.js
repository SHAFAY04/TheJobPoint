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
const express = __importStar(require("express"));
const verifyRoles_1 = __importDefault(require("../middleware/verifyRoles"));
const rolesList_1 = __importDefault(require("../config/rolesList"));
const jobsController_1 = require("../controllers/jobsController");
const jobsRoute = express.Router();
// Set up routes with middleware
jobsRoute.route('/')
    // Uncomment and use if JWT verification is not needed for the entire userRoute
    // .get(verifyJWT, getAllUsers)
    .get((0, verifyRoles_1.default)(rolesList_1.default.User), jobsController_1.getAllJobs)
    .post((0, verifyRoles_1.default)(rolesList_1.default.Admin, rolesList_1.default.Editor), jobsController_1.createJob)
    .put((0, verifyRoles_1.default)(rolesList_1.default.Admin, rolesList_1.default.Editor), jobsController_1.editJob)
    .delete((0, verifyRoles_1.default)(rolesList_1.default.Admin), jobsController_1.deleteJob);
jobsRoute.route('/:id')
    .get((0, verifyRoles_1.default)(rolesList_1.default.User), jobsController_1.getJob);
exports.default = jobsRoute;
